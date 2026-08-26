/*
c.chat (Certonymics) fork addition — not an upstream element-web file.

Lazily-created singleton CertonymStore (ADR-0006). All batching, caching and
signature policy lives in @cchat/certonym-web-sdk; this file only wires it to
element-web's SdkConfig.
*/

import { CertonymStore } from "@cchat/certonym-web-sdk";

import SdkConfig from "../SdkConfig";

/** Shape of the `"com.certonymics.cchat"` key in config.json. */
interface CertonymConfig {
    cisBaseUrl?: string;
}

let store: CertonymStore | undefined;

/**
 * The app-wide CertonymStore, created on first use so SdkConfig is guaranteed
 * to have been loaded by the time we read it.
 */
export function getCertonymStore(): CertonymStore {
    if (!store) {
        // "com.certonymics.cchat" is a fork-specific config key, not part of
        // upstream's WebConfigJson type — read it through an untyped view.
        const cfg = (SdkConfig.get() as unknown as Record<string, unknown>)["com.certonymics.cchat"] as
            | CertonymConfig
            | undefined;
        store = new CertonymStore({
            cisBaseUrl: cfg?.cisBaseUrl ?? "https://cdot.chat",
            // M2 interim posture (ADR-0006): CIS does not sign attestations yet,
            // so accept the `keyId: "unsigned"` sentinel. Safe only while
            // federation is closed and we talk to CIS directly over TLS.
            // M3 REMOVES this flag from the SDK entirely — when CIS starts
            // signing (Ed25519 key at /.well-known/cdot/identity), delete this
            // line and let the default fail-closed policy verify signatures.
            allowUnsigned: true,
        });
    }
    return store;
}
