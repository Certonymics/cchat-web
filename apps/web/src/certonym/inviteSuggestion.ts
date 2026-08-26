/*
c.chat (Certonymics) fork addition — not an upstream element-web file.

Email → verified-mxid invite suggestions via the certonym directory
(ADR-0004, CIS POST /v1/resolve). Kept out of InviteDialog.tsx so the fork
patch there stays a one-liner-scale insertion.
*/

import { MatrixClientPeg } from "../MatrixClientPeg";
import * as Email from "../email";
import { DirectoryMember, type Member } from "../utils/direct-messages";
import { getCertonymStore } from "./store";

export interface CertonymInviteResult {
    /** Zero or one suggestion entries in InviteDialog's `Result` shape. */
    suggestions: { userId: string; user: Member }[];
    /** Set only when the term was an email and the directory had no verified match. */
    noMatch?: string;
}

/**
 * If `term` looks like an email, resolve it against the certonym directory.
 * Non-email terms (and lookup failures) resolve to an empty result so the
 * caller can unconditionally `setState` with what comes back.
 *
 * The bearer token is the user's own Matrix access token (interim M2
 * credential; the SDK never mints or stores one).
 */
export async function certonymInviteSuggestion(term: string): Promise<CertonymInviteResult> {
    if (!Email.looksValid(term)) return { suggestions: [] };
    const token = MatrixClientPeg.get()?.getAccessToken();
    if (!token) return { suggestions: [] };

    try {
        const result = await getCertonymStore().resolveEmail(term, token);
        if ("mxid" in result && result.verified) {
            return {
                suggestions: [
                    {
                        // The search term is the identifier so the entry surfaces
                        // in suggestions; the email doubles as the display name so
                        // no raw mxid is shown (checklist §10).
                        userId: term,
                        user: new DirectoryMember({ user_id: result.mxid, display_name: term }),
                    },
                ],
            };
        }
        // Not found and opted-out are deliberately the same answer (ADR-0004).
        return { suggestions: [], noMatch: "No verified c.chat user with this email" };
    } catch {
        // CIS unreachable or non-2xx: fail quiet — the stock invite paths still work.
        return { suggestions: [] };
    }
}
