# Task service

A small, entirely fabricated multi-tenant CRM task service used as a review fixture. It contains no customer source code or data.

Each session identifies a tenant and the carrier accounts its user can access. Carrier IDs are unique within a tenant, not globally. Every task read must respect both tenant and carrier access, including direct lookups by task ID. IDs identify records and are not access credentials.

Tasks inherit the carrier and owner of their deal. Moving a task between deals transfers its carrier and owner so the destination owner's assignment queue receives it. Closing a deal archives its tasks, retaining their contents for audit history and removing them from open assignments. The store is synchronous and mutations are immediately visible.

The API adapter below exposes each operation directly to authenticated sessions. Authentication supplies the session; resource authorization belongs to the store.
