import { useState, useEffect, useRef } from 'react';

/**
 * A custom React hook that detects when an element is visible in the viewport.
 * @param {Object} options - Configuration options for the IntersectionObserver.
 * @returns {[React.RefObject, boolean]} A ref to attach to the element and a boolean indicating if it's intersecting.
 */
export const useIntersectionObserver = (options) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // When the element is intersecting, update the state
            if (entry.isIntersecting) {
                setIsIntersecting(true);
                // Stop observing the element once it has become visible
                observer.unobserve(entry.target);
            }
        }, options);

        const currentElement = elementRef.current;
        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [options]);

    return [elementRef, isIntersecting];
};
