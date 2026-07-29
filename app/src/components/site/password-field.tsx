// Password input with a show/hide eye toggle.
//
// forwardRef is required, not cosmetic: react-hook-form's `register()`
// returns a ref callback among its props, so `<PasswordField
// {...register("password")} />` only wires up correctly if the ref reaches
// the real <input>.
import { forwardRef, useState, type InputHTMLAttributes } from "react";

import { IconEye, IconEyeOff } from "./icons";
import { useT } from "../../lib/i18n/context";

type PasswordFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  function PasswordField({ className, ...rest }, ref) {
    const t = useT();
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <input
          {...rest}
          ref={ref}
          type={visible ? "text" : "password"}
          className={`ca-input ca-input-affix ${className ?? ""}`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? t("auth.password.hide") : t("auth.password.show")}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-ca-ink-soft transition-colors hover:text-ca-ink focus-visible:outline-2 focus-visible:outline-ca-gold"
        >
          {visible ? <IconEyeOff className="h-5 w-5" /> : <IconEye className="h-5 w-5" />}
        </button>
      </div>
    );
  },
);
