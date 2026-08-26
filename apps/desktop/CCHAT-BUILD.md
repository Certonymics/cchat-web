# Building c.chat Desktop (M4)

How to build the c.chat-branded desktop app from this fork, packing the **local**
`apps/web` webapp (with the certonym auth module) instead of Element's published
release tarball.

## What is branded where

| Thing | Where | Value |
| --- | --- | --- |
| electron-builder variant | `cchat/build.json` (selected via `VARIANT_PATH`) | appId `chat.cdot.desktop`, productName `c.chat`, package name `cchat-desktop` |
| appId / bundle identifier | `cchat/build.json` → `Info.plist` `CFBundleIdentifier` | `chat.cdot.desktop` |
| URL protocol schemes (OIDC callback etc.) | `cchat/build.json` `protocols` | `chat.cdot.desktop` (primary), `cchat` |
| App icons (mac/win/linux + runtime window/tray icon at `Resources/build/icon.*`) | `cchat/icons/` (`icon.icns`, `icon.ico`, `icon.png`) | in-house placeholder “c.” mark — replace with final artwork when available (same filenames, no other change needed) |
| Runtime config packed into `webapp.asar` | `cchat/config.json` | `brand: c.chat`, cdot.chat homeserver, `modules: [/modules/cchat-auth-v2.js]`, certonym settings, **no `update_base_url`** |
| Copyright string | `cchat/build.json` `copyright` → `NSHumanReadableCopyright` | Certonymics + AGPL attribution of upstream code (the one intentional remaining “Element” mention — attribution, not branding) |
| Linux executable / deb name | `cchat/build.json` | `cchat-desktop` |

`electron-builder.ts` was extended (upstream-mergeable) to honour two optional
variant keys: `icons` (a directory whose `icon.*` files replace Element's
`build/icon.*` everywhere, including the `extraResources` copy the app reads at
runtime) and `copyright`. When `icons` is set the publish configuration is also
nulled so no `app-update.yml` referencing `vector-im/element-web` is generated
into the bundle.

Do **not** build with `element.io/` configs — those are Element's own brand
(kept only as the upstream pattern) and their config points auto-update at
Element's servers.

## Auto-update decision

**Auto-update is disabled.** The updater in `src/electron-main.ts` only starts
when `update_base_url` is present in the packed `config.json`; `cchat/config.json`
deliberately omits it, and the app logs
`No update_base_url is defined: auto update is disabled` at startup (verified).
Leaving Element's `https://packages.element.io/desktop/update/` in place would
mean our users' app self-replaces with binaries from a feed we do not control —
a supply-chain security problem, not just a branding one. Additionally, the
electron-builder-generated `app-update.yml` (which would have referenced
`vector-im/element-web` on GitHub; unused by this app's updater, but wrong to
ship) is suppressed for branded builds.

To enable updates later: stand up a c.chat-controlled update server serving the
Squirrel.Mac/Squirrel.Windows layout that `src/updater.ts` expects
(`<base>/macos/releases.json`, `<base>/win32/<arch>/`), then set
`update_base_url` in `cchat/config.json`. macOS auto-update also requires
signed builds (Squirrel.Mac refuses unsigned updates).

## Build procedure (macOS, arm64)

Prereqs: `pnpm install` done at the repo root, and a built webapp at
`apps/web/webapp` (from the apps/web build).

```bash
cd apps/desktop

# 1. Pack the LOCAL webapp + cchat desktop config into webapp.asar.
#    (Replaces `pnpm run fetch`, which downloads Element's release tarball.)
scripts/pack-local-webapp.sh

# 2. Compile the Electron main process (skippable if lib/ is current):
pnpm exec tsc && node scripts/copy-res.ts

# 3. Native modules (optional): matrix-seshat (encrypted-room search) needs the
#    hak build (Rust + sqlcipher). Without it the app runs fine and logs a
#    seshat load error at startup; event search in encrypted rooms is disabled.
#    If skipping, electron-builder still needs the directory to exist:
mkdir -p .hak/hakModules

# 4. Package (unsigned local build):
VARIANT_PATH=cchat/build.json CSC_IDENTITY_AUTO_DISCOVERY=false \
    pnpm exec electron-builder --publish never
```

Note: `pnpm run build` (the nx target) works too, but nx caches the `build`
target on inputs that do not include `VARIANT_PATH`/`webapp.asar` content
changes, so it can replay a stale package; the direct `electron-builder`
invocation above is what is known-good.

Artifacts land in `apps/desktop/dist/`:

- `dist/mac-arm64/c.chat.app` — unpacked app (~520 MB)
- `dist/c.chat-<version>-arm64.dmg` (~216 MB)
- `dist/c.chat-<version>-arm64-mac.zip` (~216 MB)

The version currently follows upstream's `package.json` (1.12.26); override
with `VERSION=x.y.z` in the environment of step 4 if a c.chat version scheme
is wanted.

## Verifying a build

```bash
/usr/libexec/PlistBuddy -c "Print :CFBundleIdentifier" dist/mac-arm64/c.chat.app/Contents/Info.plist
#  -> chat.cdot.desktop
node -e 'const a=require("@electron/asar");console.log(a.extractFile("dist/mac-arm64/c.chat.app/Contents/Resources/webapp.asar","config.json").toString())'
#  -> brand c.chat, modules: ["/modules/cchat-auth-v2.js"], no update_base_url
pnpm exec asar l dist/mac-arm64/c.chat.app/Contents/Resources/webapp.asar | grep -E "cchat-auth|certonym" | head
# Launch check (window opens; startup log should include the line below):
dist/mac-arm64/c.chat.app/Contents/MacOS/c.chat --profile-dir /tmp/cchat-test
#  -> "No update_base_url is defined: auto update is disabled"
```

## Signing / notarization (needed before distributing)

The local build is **unsigned** (ad-hoc signature only; the
`resetAdHocDarwinSignature` Electron fuse is set automatically when
`APPLE_TEAM_ID` is absent, which is why the unsigned app launches at all).
Gatekeeper will block it on other Macs unless users right-click → Open or
clear the quarantine attribute. For distribution you need:

1. An Apple Developer Program membership ($99/yr) and a **Developer ID
   Application** certificate in the build machine's keychain.
2. Build with `APPLE_TEAM_ID=<teamid>` (enables hardened-runtime signing; drop
   `CSC_IDENTITY_AUTO_DISCOVERY=false`).
3. Notarization: electron-builder submits automatically when
   `APPLE_ID` + `APPLE_APP_SPECIFIC_PASSWORD` (or an App Store Connect API key)
   are set; Apple staples the ticket to the dmg.
4. Windows equivalents: an Authenticode cert via
   `ED_SIGNTOOL_SUBJECT_NAME`/`ED_SIGNTOOL_THUMBPRINT` (already plumbed in
   `electron-builder.ts`).

Never commit signing credentials; supply them via CI secrets.

## Known gaps / honest state

- Icons are generated placeholders (`cchat/icons/`), fine for internal use;
  swap in final brand artwork before any public release.
- matrix-seshat (encrypted search) is not built — needs the hak toolchain.
- Universal (x64+arm64) mac builds need `pnpm run build:native:universal` and
  `--universal`; only arm64 has been produced/tested.
- Windows/Linux packages are unbuilt (cross-compiling needs the docker flow).
- `apps/web/webapp/config.json` (web build output) and `cchat/config.json`
  must be kept in sync manually; the desktop copy adds `help_url`/`web_base_url`
  and is the one that ships in the asar.
