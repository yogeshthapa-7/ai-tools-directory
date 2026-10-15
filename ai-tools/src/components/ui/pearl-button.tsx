import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type PearlButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: React.ReactNode;
  href?: string;
  variant?: "primary" | "outline";
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
  showSparkle?: boolean;
};

export const PearlButton: React.FC<PearlButtonProps> = ({
  label,
  href,
  variant = "outline",
  size = "sm",
  className = "",
  children,
  showSparkle,
  disabled,
  style,
  ...props
}) => {
  const sizeStyles: Record<string, React.CSSProperties> = {
    xs: {
      "--btn-padding": "5px 12px",
      "--btn-font-size": "12px",
      "--btn-gap": "5px",
      "--btn-min-height": "28px",
    } as React.CSSProperties,
    sm: {
      "--btn-padding": "7px 16px",
      "--btn-font-size": "13.5px",
      "--btn-gap": "6px",
      "--btn-min-height": "36px",
    } as React.CSSProperties,
    md: {
      "--btn-padding": "9px 20px",
      "--btn-font-size": "14.5px",
      "--btn-gap": "7px",
      "--btn-min-height": "40px",
    } as React.CSSProperties,
    lg: {
      "--btn-padding": "11px 24px",
      "--btn-font-size": "16px",
      "--btn-gap": "8px",
      "--btn-min-height": "46px",
    } as React.CSSProperties,
  };

  const currentSizeStyle = sizeStyles[size] || sizeStyles.sm;
  const shouldSparkle = showSparkle !== undefined ? showSparkle : !children;

  const content = (
    <div className="wrap">
      <span className="pearl-shine" aria-hidden="true" />
      <div className="pearl-content">
        {shouldSparkle && (
          <span className="pearl-sparkle" aria-hidden="true">
            <span className="sparkle-idle">✧</span>
            <span className="sparkle-hover">✦</span>
          </span>
        )}
        {label && <span>{label}</span>}
        {children}
      </div>
    </div>
  );

  const buttonClasses = cn(
    "pearl-button",
    variant === "primary" ? "pearl-button--primary" : "pearl-button--outline",
    className
  );

  return (
    <>
      <style>{`
        .pearl-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 !important;
          margin: 0;
          outline: none;
          cursor: pointer;
          text-decoration: none;
          user-select: none;
          border-radius: 9999px;
          min-height: var(--btn-min-height, 36px);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.2s ease,
                      filter 0.2s ease;
          -webkit-tap-highlight-color: transparent;
          vertical-align: middle;
          overflow: hidden;
        }

        .pearl-button--primary {
          background: linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%);
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow:
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.45),
            inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.3),
            inset 0 0 10px 0 rgba(255, 255, 255, 0.12),
            0 2px 6px -1px rgba(37, 99, 235, 0.35),
            0 1px 2px 0 rgba(0, 0, 0, 0.1);
        }

        .pearl-button--primary:hover {
          background: linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%);
          transform: translateY(-1px);
          box-shadow:
            inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.55),
            inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.3),
            inset 0 0 12px 0 rgba(255, 255, 255, 0.2),
            0 4px 12px -1px rgba(37, 99, 235, 0.45),
            0 2px 4px 0 rgba(0, 0, 0, 0.12);
        }

        .pearl-button--outline {
          background: linear-gradient(180deg, #1c1c20 0%, #0a0a0d 100%);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.35),
            inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.6),
            inset 0 0 8px 0 rgba(255, 255, 255, 0.05),
            0 2px 6px -1px rgba(0, 0, 0, 0.25),
            0 1px 2px 0 rgba(0, 0, 0, 0.12);
        }

        .pearl-button--outline:hover {
          background: linear-gradient(180deg, #27272e 0%, #111115 100%);
          transform: translateY(-1px);
          box-shadow:
            inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.45),
            inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.6),
            inset 0 0 10px 0 rgba(255, 255, 255, 0.08),
            0 4px 12px -1px rgba(0, 0, 0, 0.35),
            0 2px 3px 0 rgba(0, 0, 0, 0.15);
        }

        .pearl-button:active {
          transform: translateY(1px);
        }

        .pearl-button:disabled,
        .pearl-button[aria-disabled="true"] {
          opacity: 0.6;
          cursor: not-allowed;
          pointer-events: none;
          transform: none !important;
        }

        .pearl-button .wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          border-radius: inherit;
          padding: var(--btn-padding, 7px 16px);
          font-size: var(--btn-font-size, 13.5px);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.95);
          letter-spacing: -0.01em;
          line-height: 1.2;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
          white-space: nowrap;
        }

        .pearl-button .pearl-shine {
          position: absolute;
          left: 6px;
          right: 6px;
          top: 1px;
          height: 44%;
          border-radius: 9999px 9999px 50% 50% / 9999px 9999px 30% 30%;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.02) 80%, transparent 100%);
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        .pearl-button:hover .pearl-shine {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.04) 80%, transparent 100%);
        }

        .pearl-button .pearl-content {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: var(--btn-gap, 6px);
        }

        .pearl-button .pearl-sparkle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1em;
          line-height: 1;
          color: rgba(255, 255, 255, 0.9);
        }

        .pearl-button .sparkle-hover {
          display: none;
        }

        .pearl-button:hover .sparkle-idle {
          display: none;
        }

        .pearl-button:hover .sparkle-hover {
          display: inline-block;
        }
      `}</style>

      {href && !disabled ? (
        <Link
          href={href}
          className={buttonClasses}
          style={{ ...currentSizeStyle, ...style }}
        >
          {content}
        </Link>
      ) : (
        <button
          className={buttonClasses}
          style={{ ...currentSizeStyle, ...style }}
          disabled={disabled}
          {...props}
        >
          {content}
        </button>
      )}
    </>
  );
};