/*
c.chat (Certonymics) fork addition — not an upstream element-web file.

Certonym identity badge (ADR-0006). Blue = identity verification (distinct
from Element's green E2EE shields). All verification logic (batching, caching,
fail-closed signature policy) lives in @cchat/certonym-web-sdk — this file
only renders the resulting state.

Copy is intentionally centralised here (not i18n'd yet) — the checklist
requires identical failure copy across platforms; a shared strings source
replaces these literals when it exists.
*/

import React, { type JSX } from "react";
import { useCertonymVerification } from "@cchat/certonym-web-sdk/react";

import { MatrixClientPeg } from "../MatrixClientPeg";
import { getCertonymStore } from "./store";
import "./certonym.pcss";

/** Frozen assurance-tier taxonomy (ADR-0006, @cchat/cis-api `Assurance`). */
const TIER_LABELS: Record<string, string> = {
    nfc: "Identity verified — passport (NFC)",
    web: "Identity verified — document scan",
    liveness: "Identity verified — liveness",
};

/** Small tier glyph rendered next to the tick so tiers are visually distinct. */
const TIER_GLYPHS: Record<string, string> = {
    nfc: "⬢",
    web: "◆",
    liveness: "●",
};

interface IProps {
    /** Full mxid of the user this badge describes. */
    userId: string;
    /** Tight-space rendering: smaller badge, and no "unverified" hollow tick. */
    compact?: boolean;
}

/** True when `userId` lives on our own homeserver (a cdot.chat identity). */
function isLocalServerUser(userId: string): boolean {
    try {
        const domain = MatrixClientPeg.get()?.getDomain();
        return !!domain && userId.endsWith(`:${domain}`);
    } catch {
        return false;
    }
}

export function CertonymBadge({ userId, compact }: IProps): JSX.Element | null {
    const result = useCertonymVerification(getCertonymStore(), userId);

    if (result.state === "verified") {
        const label = TIER_LABELS[result.assurance] ?? "Identity verified";
        return (
            <span
                className={"cchat_CertonymBadge" + (compact ? " cchat_CertonymBadge_compact" : "")}
                title={label}
                aria-label={label}
                role="img"
                data-tier={result.assurance}
            >
                ✓<span className="cchat_CertonymBadge_tier">{TIER_GLYPHS[result.assurance]}</span>
            </span>
        );
    }

    // Only a locally verified, unexpired attestation may render as verified;
    // everything else fails closed to "unverified" (ADR-0006). We surface that
    // only for cdot.chat identities, only where space allows.
    if (result.state === "unverified" && !compact && isLocalServerUser(userId)) {
        const label = "Not certonym-verified";
        return (
            <span
                className="cchat_CertonymBadge cchat_CertonymBadge_unverified"
                title={label}
                aria-label={label}
                role="img"
            >
                ✓
            </span>
        );
    }

    // "pending" (lookup queued/in flight) renders nothing.
    return null;
}
