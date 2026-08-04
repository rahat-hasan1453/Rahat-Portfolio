import { useCallback, useState } from "react";
import { isCaseUnlocked } from "../lib/caseAccess.js";
import { navigate, caseStudyPath } from "../lib/router.js";

/* Shared by every place a case study can be opened from — the homepage rail
   and the Case Studies list. Each study is unlocked on its own: if THIS study
   is already open the card goes straight through, otherwise the gate takes
   over and the study opens itself once the code checks out. */
export default function useCaseGate() {
  const [pending, setPending] = useState(null);

  const go = (slug) => navigate(caseStudyPath(slug));

  const openCase = useCallback((slug, title) => {
    if (isCaseUnlocked(slug)) {
      go(slug);
      return;
    }
    setPending({ slug, title });
  }, []);

  const gateProps = {
    open: !!pending,
    title: pending?.title,
    slug: pending?.slug,
    onClose: () => setPending(null),
    onUnlocked: () => {
      const slug = pending?.slug;
      setPending(null);
      if (slug) go(slug);
    },
  };

  return { openCase, gateProps };
}
