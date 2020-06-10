import { useState, useRef } from 'react'
import styles from './actorPortrait.module.css'
import classNames from 'classnames'
import { useEffect } from 'react'

export default function ActorPortrait({ actor }) {
  const actorIframe = useRef(null);

  useEffect(() => {
    actorIframe.current = document.getElementById("burger-phone");
    actorIframe.current.onload = function() {
      actorIframe.current.contentWindow.addEventListener("actorReady", actorInit);
    }
  })

  const actingFinished = () => {
    //handle when acts are finished ie change state to something
    theSituation.setActorState(actor.handle, theSituation.getActorState(actor.handle) + "_done");
  }

  const actorInit = () => {
    theSituation.setActorMc(actor.handle, actorIframe.current.contentWindow.stage.children[0].actor)
    actorIframe.current.contentWindow.removeEventListener("actorReady", actorInit);
    actorIframe.current.contentWindow.addEventListener("actingFinished", actingFinished);
    //setCuedAnimation(cuedAnimation.slice(1, cuedAnimation.length-1));
  }
  
  return (
    <>
    <iframe className={classNames('w-1/4', 'sm:w-1/4', 'md:w-1/3', 'lg:w-1/5', styles.messages)} id="burger-phone" src={actor.src}></iframe>
    </>
  )
}

// # events #
// actorReady
// actorIdleing
// actorExited
// # actorStates #
// # always gerund? doesAlwaysFinish boolean :/