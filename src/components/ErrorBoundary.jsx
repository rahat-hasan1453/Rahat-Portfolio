import { Component } from "react";

/* =========================================================================
   Without this, a single render error unmounts the whole tree and the visitor
   gets a blank black page with no way forward — which is exactly what happened
   during development more than once.

   Deliberately plain: it reuses the site's own type and colours, offers a
   reload and a way home, and never blames the visitor.
   ========================================================================= */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    // still worth surfacing in the console for anyone debugging
    console.error("Render error:", error, info);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="bg-ink flex min-h-screen w-full flex-col items-center justify-center gutter text-center">
        <h1 className="font-serif-display text-[32px] not-italic leading-[40px] tracking-[1.28px] text-white">
          Something went wrong on my end
        </h1>
        <p className="font-jakarta mt-[12px] max-w-[460px] text-[16px] font-medium leading-[24px] tracking-[0.64px] text-[#b3b3b3]">
          Not your fault — the page failed to load properly. A refresh usually sorts it.
        </p>
        <div className="mt-[28px] flex items-center gap-[12px]">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="accent-gradient font-jakarta rounded-[35px] px-[20px] py-[12px] text-[16px] font-medium text-white transition-transform duration-300 hover:scale-[1.04] active:scale-[0.97]"
          >
            Reload the page
          </button>
          <a
            href="/"
            className="font-jakarta rounded-[35px] px-[20px] py-[12px] text-[16px] font-medium text-[#b3b3b3] underline [text-underline-position:from-font] transition-colors duration-300 hover:text-white"
          >
            Back to home
          </a>
        </div>
      </div>
    );
  }
}
