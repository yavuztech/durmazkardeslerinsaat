"use client";

import { motion, useReducedMotion } from "framer-motion";

export function CraneScene() {
  const reduceMotion = useReducedMotion();
  const transition = (duration: number, delay = 0) =>
    reduceMotion ? { duration: 0 } : { duration, delay, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="crane-scene" aria-hidden="true">
      <div className="scene-grid" />
      <div className="scene-glow" />
      <svg className="crane-svg" viewBox="0 0 900 650" role="presentation">
        <defs>
          <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#d9e7f2" />
            <stop offset=".48" stopColor="#6e91ad" />
            <stop offset="1" stopColor="#244f75" />
          </linearGradient>
          <linearGradient id="building" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#164b79" />
            <stop offset="1" stopColor="#092743" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="#50708b" strokeWidth="1.5" opacity=".36">
          <path d="M45 590V400H125V590 M63 430H108 M63 458H108 M63 486H108 M63 514H108 M63 542H108" />
          <path d="M660 590V350H738V590 M678 380H720 M678 410H720 M678 440H720 M678 470H720 M678 500H720" />
          <path d="M735 590V445H820V590 M753 472H802 M753 500H802 M753 528H802" />
        </g>
        <motion.g
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition(0.9, 0.15)}
        >
          <path d="M210 590V370L286 310V590Z" fill="url(#building)" opacity=".88" />
          <path d="M286 590V278L356 330V590Z" fill="#123e65" />
          <path d="M210 395L286 335 M210 433L286 373 M210 471L286 411 M210 509L286 449 M210 547L286 487" stroke="#6f9abb" strokeWidth="2" opacity=".42" />
          <path d="M356 590V388L418 430V590Z" fill="#0c3152" />
          <path d="M378 420L397 433 M378 459L397 472 M378 498L397 511 M378 537L397 550" stroke="#6f9abb" strokeWidth="2" opacity=".45" />
        </motion.g>
        <motion.g
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition(0.8, 0.45)}
          fill="none"
          stroke="url(#steel)"
          strokeWidth="7"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d="M470 590V112" />
          <path d="M443 590H497 M453 570H487 M453 540H487 M453 510H487 M453 480H487 M453 450H487 M453 420H487 M453 390H487 M453 360H487 M453 330H487 M453 300H487 M453 270H487 M453 240H487 M453 210H487 M453 180H487 M453 150H487" strokeWidth="3" opacity=".7" />
          <path d="M470 112L180 170L195 190L470 133L760 185L745 164Z" fill="#0b3457" strokeWidth="4" />
          <path d="M205 177L244 180L232 188 M264 166L303 176L289 183 M325 154L363 165L350 172 M386 142L424 154L411 160 M447 135L485 145L473 151 M509 143L547 154L534 160 M570 154L608 165L596 171 M632 164L670 175L658 181 M694 174L732 183" strokeWidth="3" />
          <path d="M470 112L420 70L180 170 M470 112L510 180" strokeWidth="6" />
          <path d="M180 170V225L212 219V176 M745 164V226 M760 185V226" strokeWidth="5" />
        </motion.g>
        <motion.g
          initial={reduceMotion ? false : { y: -15 }}
          animate={{ y: [0, 10, 0] }}
          transition={reduceMotion
            ? { duration: 0 }
            : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M706 183V293 M728 188V293" stroke="#dce8f1" strokeWidth="3" />
          <path d="M706 293L700 307Q700 321 716 321Q731 321 731 306L728 293" fill="none" stroke="#dce8f1" strokeWidth="6" strokeLinecap="round" />
          <path d="M716 321Q716 338 730 338Q742 338 742 325" fill="none" stroke="#dce8f1" strokeWidth="6" strokeLinecap="round" />
        </motion.g>
        <motion.path
          d="M95 590H815"
          stroke="#7e9bb2"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={transition(1.2, 0.65)}
        />
        <motion.g
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={transition(0.8, 0.85)}
        >
          <rect x="490" y="410" width="124" height="180" fill="#0b2b49" opacity=".86" />
          <path d="M510 430H594 M510 456H594 M510 482H594 M510 508H594 M510 534H594 M510 560H594" stroke="#2f5c7d" strokeWidth="2" />
          <path d="M531 410V590 M573 410V590" stroke="#2f5c7d" strokeWidth="2" />
        </motion.g>
      </svg>
      <div className="scene-caption"><span className="status-dot" /> <span>SAĞLAM TEMELLER</span><span className="caption-line" /></div>
      <div className="scene-index">DK<span> / </span>01</div>
    </div>
  );
}
