import {useEffect, useCallback} from 'react'
import useIsMounted from './useIsMounted'

/**
 * This hook registers a repeated effect to be executed every
 * [timeout] milliseconds.  The effect function should recieve
 * a callback function as its first parameter, to be executed
 * after the effect is completed (so the timeout for an async
 * effect is not started until the effect is done)
 *
 * @param {*} func - Effect function to be called
 *
 * @param {*} params - An array of values on which the function
 * depends.  The effect loop will be re-initialed if any of these
 * change
 *
 * @param {*} timeout - The length of time (in milliseconds) to
 * wait between executions of the effect function
 *
 * Example: To log a message every second
 * `useRepeated(callback=>{console.log('hello'); callback()}, [], 1000)`
 *
 * Example: To make a network request to a variable URL, repeating
 * every second or when the variable changes
 * `useRepeated(callback=>axios.get(url).then(()=>callback()), [url], 1000)`
 */

export default function useRepeated(func, params, timeout) {
  const mounted = useIsMounted()

  // Memoize the function so our effect is only reset when the params change
  const memoizedFunc = useCallback(func, params)

  useEffect(()=>{
    let t

    // Set up a timeout loop
    const doThing = ()=>{
      memoizedFunc(()=>{
        // Because the memoizedFunc can be asyncronous,
        // and our clearTimeout could run while in between
        // calling it and coming back to this callback,
        // We need to make sure our component is still
        // mounted here just in case.
        if(mounted && t)
          t = setTimeout(doThing, timeout)
      })
    }

    // Start loop
    t = setTimeout(doThing(), 0)

    // Remove timeout when cleaning up effect
    return ()=>{
      clearTimeout(t)
      t = null
    }
  }, [memoizedFunc, timeout, mounted])
}
