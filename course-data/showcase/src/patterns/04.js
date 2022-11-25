import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useMemo,
  useContext,
  useRef,
} from "react";
import mojs from "mo-js";
import styles from "./index.css";

const initialState = {
  count: 0,
  countTotal: 267,
  isClicked: false,
};

// update
/**
 * Custom hook for animation
 */

const useClapAnimation = ({ clapEl, clapCountEl, clapCountTotalEl }) => {
  const [animationTimeline, setAnimationTimeline] = useState(
    () => new mojs.Timeline()
  );

  useEffect(() => {
    const TL_DURATION = 300;

    if (!clapEl || !clapCountEl || !clapCountTotalEl) return;

    const scaleButton = new mojs.Html({
      el: clapEl,
      duration: TL_DURATION,
      scale: { 1.3: 1 },
      easing: mojs.easing.ease.out,
    });

    const triangleBurst = new mojs.Burst({
      parent: clapEl,
      radius: { 50: 95 },
      count: 5,
      angle: 30,
      children: {
        shape: "polygon",
        radius: { 6: 0 },
        stroke: "rgba(211,54,0,0.5)",
        strokeWidth: 2,
        angle: 210,
        speed: 0.2,
        delay: 30,
        duration: TL_DURATION,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      },
    });

    const circleBurst = new mojs.Burst({
      parent: clapEl,
      radius: { 50: 75 },
      angle: 25,
      duration: TL_DURATION,
      children: {
        shape: "circle",
        radius: { 3: 0 },
        fill: "rgba(149,165,166,0.5)",
        delay: 30,
        duration: TL_DURATION,
        speed: 0.2,
        easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
      },
    });

    const countAnimation = new mojs.Html({
      el: clapCountEl,
      opacity: { 0: 1 },
      duration: TL_DURATION,
      y: { 0: -30 },
    }).then({
      opacity: { 1: 0 },
      y: -80,
      delay: TL_DURATION / 2,
    });

    const countTotalAnimation = new mojs.Html({
      el: clapCountTotalEl,
      opacity: { 0: 1 },
      delay: (3 * TL_DURATION) / 2,
      duration: TL_DURATION,
      y: { 0: -3 },
    });

    clapEl.style.transform = "scale(1,1)";

    const newAnimationTimeline = animationTimeline.add([
      scaleButton,
      countTotalAnimation,
      countAnimation,
      triangleBurst,
      circleBurst,
    ]);

    setAnimationTimeline(newAnimationTimeline);
  }, [clapEl, clapCountEl, clapCountTotalEl]);

  return animationTimeline;
};

/**
 * Components
 */

const MediumClapContext = createContext();
const Provider = MediumClapContext.Provider;

const MediumClap = ({ children, onClap }) => {
  const MAXIMUM_CLAP = 10;

  const [{ clapRef, clapCountRef, clapCountTotalRef }, setRefState] = useState(
    {}
  );
  const setRef = useCallback((node) => {
    setRefState((prevRefState) => ({
      ...prevRefState,
      [node.dataset.refkey]: node,
    }));
  }, []);

  const animationTimeline = useClapAnimation({
    clapEl: clapRef,
    clapCountEl: clapCountRef,
    clapCountTotalEl: clapCountTotalRef,
  });

  const [clapState, setClapState] = useState(initialState);

  const componentJustMounted = useRef(true);
  useEffect(() => {
    !componentJustMounted.current && onClap && onClap(clapState);
    componentJustMounted.current = false;
  }, [clapState.count]);

  const handleClapClick = () => {
    animationTimeline.replay();
    setClapState((prevState) => {
      if (prevState.count == MAXIMUM_CLAP) return prevState;

      return {
        isClicked: true,
        count: prevState.count + 1,
        countTotal: prevState.countTotal + 1,
      };
    });
  };

  const memorizedValue = useMemo(
    () => ({ ...clapState, setRef }),
    [clapState, setRef]
  );

  return (
    <Provider value={memorizedValue}>
      <button
        ref={setRef}
        data-refkey="clapRef"
        className={styles.clap}
        onClick={handleClapClick}
      >
        {children}
      </button>
    </Provider>
  );
};

/**
 * Sub-components
 */

const ClapIcon = () => {
  const { isClicked } = useContext(MediumClapContext);

  return (
    <span>
      <svg
        id="clapIcon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-549 338 100.1 125"
        className={`${styles.icon} ${isClicked && styles.checked}`}
      >
        <path d="M-471.2 366.8c1.2 1.1 1.9 2.6 2.3 4.1.4-.3.8-.5 1.2-.7 1-1.9.7-4.3-1-5.9-2-1.9-5.2-1.9-7.2.1l-.2.2c1.8.1 3.6.9 4.9 2.2zm-28.8 14c.4.9.7 1.9.8 3.1l16.5-16.9c.6-.6 1.4-1.1 2.1-1.5 1-1.9.7-4.4-.9-6-2-1.9-5.2-1.9-7.2.1l-15.5 15.9c2.3 2.2 3.1 3 4.2 5.3zm-38.9 39.7c-.1-8.9 3.2-17.2 9.4-23.6l18.6-19c.7-2 .5-4.1-.1-5.3-.8-1.8-1.3-2.3-3.6-4.5l-20.9 21.4c-10.6 10.8-11.2 27.6-2.3 39.3-.6-2.6-1-5.4-1.1-8.3z" />
        <path d="M-527.2 399.1l20.9-21.4c2.2 2.2 2.7 2.6 3.5 4.5.8 1.8 1 5.4-1.6 8l-11.8 12.2c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l34-35c1.9-2 5.2-2.1 7.2-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l28.5-29.3c2-2 5.2-2 7.1-.1 2 1.9 2 5.1.1 7.1l-28.5 29.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.4 1.7 0l24.7-25.3c1.9-2 5.1-2.1 7.1-.1 2 1.9 2 5.2.1 7.2l-24.7 25.3c-.5.5-.4 1.2 0 1.7.5.5 1.2.5 1.7 0l14.6-15c2-2 5.2-2 7.2-.1 2 2 2.1 5.2.1 7.2l-27.6 28.4c-11.6 11.9-30.6 12.2-42.5.6-12-11.7-12.2-30.8-.6-42.7m18.1-48.4l-.7 4.9-2.2-4.4m7.6.9l-3.7 3.4 1.2-4.8m5.5 4.7l-4.8 1.6 3.1-3.9" />
      </svg>
    </span>
  );
};

const ClapCount = () => {
  const { count, setRef } = useContext(MediumClapContext);

  return (
    <span ref={setRef} data-refkey="clapCountRef" className={styles.count}>
      + {count}
    </span>
  );
};

const CountTotal = () => {
  const { countTotal, setRef } = useContext(MediumClapContext);

  return (
    <span ref={setRef} data-refkey="clapCountTotalRef" className={styles.total}>
      {countTotal}
    </span>
  );
};

MediumClap.Icon = ClapIcon;
MediumClap.Count = ClapCount;
MediumClap.CountTotal = CountTotal;

/**
 * Usage
 */

const Usage = () => {
  const [count, setCount] = useState(0);
  const handleClap = (clapState) => setCount(clapState.count);

  return (
    <div style={{ width: "100%" }}>
      <MediumClap onClap={handleClap}>
        <MediumClap.Icon />
        <MediumClap.Count />
        <MediumClap.CountTotal />
      </MediumClap>
      {!!count && (
        <div className={styles.info}>{`You have clapped ${count} times`}</div>
      )}
    </div>
  );
};

export default Usage;
