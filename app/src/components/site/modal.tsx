// Centered modal dialog, built directly on the Radix primitive rather than
// on src/components/ui/dialog.tsx. That shadcn file exists but is unused
// template scaffolding whose theme tokens (bg-background, ring-ring,
// text-muted-foreground) are NOT defined in this project's @theme block, so
// it would render an unstyled/transparent panel here. Going straight to
// Radix keeps the real behaviour we want (focus trap, scroll lock,
// aria-modal, portal) while the surface stays in the site's own ca-* design
// language: square corners, hairline border, no shadow-heavy elevation.
import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children?: ReactNode;
  /**
   * When false the dialog can ONLY be closed by a control inside it —
   * Escape, outside clicks and any other implicit dismissal are blocked.
   * Used for the post-login/register welcome card, which has to be
   * acknowledged before the user carries on.
   */
  dismissible?: boolean;
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  dismissible = true,
}: ModalProps) {
  const block = dismissible ? undefined : (event: Event) => event.preventDefault();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ca-ink/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        {/* `ca-motion` has to be repeated here: Radix portals this outside the
         * route's own <div className="ca-motion">, so the site-wide
         * reduced-motion rule would otherwise not reach the dialog. */}
        <Dialog.Content
          onEscapeKeyDown={block}
          onPointerDownOutside={block}
          onInteractOutside={block}
          className="ca-motion fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 border border-ca-ink/20 bg-ca-paper-bright p-8 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <Dialog.Title className="font-display text-2xl font-bold text-ca-ink">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mt-3 text-sm leading-relaxed text-ca-ink-soft">
            {description}
          </Dialog.Description>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
