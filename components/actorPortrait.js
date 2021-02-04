import { useState, useRef } from 'react'
import styles from './actorPortrait.module.css'
import classNames from 'classnames'
import { useEffect } from 'react'
import BasicActor from './basicActor'

export default function ActorPortrait({ actorData }) {
  const actorIframe = useRef(null);
  //actorPortrait should never rerender?
  useEffect(() => {
    
    actorIframe.current.onload = function() {
      actorIframe.current.contentWindow.addEventListener("actorReady", actorInit);
    }
  
    const actorInit = () => {
      //const actor = new BasicActor(actorData, actorIframe.current.contentWindow.stage.children[0].actor); // data and m
      //actor.actorLoaded(actorIframe.current.contentWindow.stage.children[0].actor);
      theSituation.setActorMc(actorData.handle, actorIframe.current.contentWindow.stage.children[0].actor)
      actorIframe.current.contentWindow.removeEventListener("actorReady", actorInit);
      actorIframe.current.contentWindow.addEventListener("actingFinished", actingFinished);
      theSituation.setActorState(actorData.handle, theSituation.getActorState(actorData.handle).name, true);
      
      const actingFinished = () => {
        //handle when acts are finished ie change state to something
        actor.actingFinished();
        theSituation.setActorState(actorData.handle, theSituation.getActorState(actorData.handle).name, true);
      }
    }
  })
  
  return (
    <>
    <iframe ref={actorIframe} className={classNames('w-1/4', 'sm:w-1/4', 'md:w-1/3', 'lg:w-1/5', "noUserSelect", "noPointerEvents", styles.actorPortrait)} id="actorPortrait" src={actorData.src}></iframe>
    </>
  )
}

// # events #
// actorReady
// actorIdleing
// actorExited
// # actorStates #
// # always gerund? doesAlwaysFinish boolean :/
