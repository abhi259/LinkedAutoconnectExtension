/*global chrome*/
import "./App.css"
import { useState, useEffect } from "react"

function App() {
  const [count, setCount] = useState(0)
  const [timer, setTimer] = useState(
    Math.floor(Math.random() * (10 - 5 + 1)) + 5
  )
  const [isRunning, setIsRunning] = useState(false)
  const [connectionsLength, setConnectionsLength] = useState(2)
  const [requestCompleted, setRequestCompleted] = useState(false)

  const startRequests = (count, timer, isRunning) => {
    // console.log("count :", count)
    // console.log("timer :", timer)
    // console.log("isRunning :", isRunning)

    let connection = document.querySelectorAll(
      ".artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view"
    )


    let filteredConnection = []

    for (let i = 0; i < connection.length; i++) {
      if (connection[i].children[0].outerText === "Connect") {
        filteredConnection.push(connection[i])
      }
    }
console.log(filteredConnection[0])
    filteredConnection[0].click()

    setTimeout(() => {
      if(document.querySelector(".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1")) {
        let messageWindowSendButton = document.querySelector(".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1")
        console.log(messageWindowSendButton)
        setTimeout(() => {
          messageWindowSendButton.click()
        },250)
       
      } else {
        let selectOtherButton = document.querySelector(".artdeco-modal.artdeco-modal--layer-default.send-invite div.artdeco-pill-choice-group.ember-view button[aria-label='Other'] ")
      console.log(selectOtherButton)
      selectOtherButton.click()
      let clickConnectButton = document.querySelector(".artdeco-modal.artdeco-modal--layer-default.send-invite div.artdeco-modal__actionbar.ember-view.display-flex.justify-flex-end button[aria-label='Connect'] ")
      console.log(clickConnectButton)
      clickConnectButton.click()

      setTimeout(() => {
        let messageWindowSendButton = document.querySelector(".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1")
        console.log(messageWindowSendButton)
          messageWindowSendButton.click()
      },250)
      }

    },700)


    
//    try{
//     setTimeout(() => {
//       let messageWindowSendButton = document.querySelector(".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1")
//       console.log(messageWindowSendButton)
//         messageWindowSendButton.click()
//     },700)
//    }  catch(error){
//     console.log(error)
//   }

    
// try{
//     setTimeout(() => {
//       let selectOtherButton = document.querySelector(".artdeco-modal.artdeco-modal--layer-default.send-invite div.artdeco-pill-choice-group.ember-view button[aria-label='Other'] ")
//       console.log(selectOtherButton)
//       selectOtherButton.click()
//       let clickConnectButton = document.querySelector(".artdeco-modal.artdeco-modal--layer-default.send-invite div.artdeco-modal__actionbar.ember-view.display-flex.justify-flex-end button[aria-label='Connect'] ")
//       console.log(clickConnectButton)
//       clickConnectButton.click()
//     },500)

//     setTimeout(() => {
//       let messageWindowSendButton = document.querySelector(".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1")
//       console.log(messageWindowSendButton)
//         messageWindowSendButton.click()
//     },700)
//   }catch(error){
//     console.log(error)
  // }
    
    return filteredConnection
  }

  const getCurrentTab = async () => {
    let queryOptions = { active: true, currentWindow: true }
    let [tab] = await chrome.tabs.query(queryOptions)
    return tab
  }

  const injectScript = async () => {
    let tab = await getCurrentTab()

    chrome.scripting
      .executeScript({
        target: { tabId: tab.id },
        func: startRequests,
        args: [count, timer, isRunning],
      })
      .then((injectionResults) => {
        console.log("injectionCount :",injectionResults[0].result.length)
        if(count === 0) {
        setConnectionsLength(injectionResults[0].result.length)
        }
      })
  }

  const sendRequests = async () => {
    setIsRunning(!isRunning)
  }

  const stopRequests = () => {
    setIsRunning(!isRunning)
  }

  useEffect(() => {
    if (count > connectionsLength - 1) {
      setIsRunning(false)
      setRequestCompleted(true)
    } else if (isRunning) {
      if (timer === -1) {
        setCount((prevState) => prevState + 1)
        setTimer(Math.floor(Math.random() * (10 - 5 + 1)) + 5)
        setTimeout( () => {
          injectScript()
        },1200)
        console.log("connectionLength :", connectionsLength)
      }
      let x = setInterval(() => {
        setTimer((prevState) => prevState - 1)
      }, 1000)

      return () => {
        clearInterval(x)
      }
    }
  }, [timer, isRunning])

  // console.log("connections:", startRequests().then(console.log(filteredConnection.length)))

  return (
    <div className="h-[500px] w-[300px] bg-gray-900 flex flex-col justify-between items-center text-white static left-3  p-5">
      <div className="fixed top-28 left-auto">
        <div
          className={` transition duration-700 loader   ${
            isRunning ? " opacity-100 " : " opacity-0"
          }`}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div className="fixed top-28 left-auto">
        <div className={`  loader-2 fixed  `}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className="fixed  top-[160px] left-auto ">
        <h1 className="text-center text-5xl text-black ">{count}</h1>
      </div>

      <div className="text-center text-2xl font-semibold h-10 flex flex-col justify-center items-center">
        <img src="LinkedinLogo.svg" alt="linkedinLogo" />
        <h1> Auto Connect </h1>
      </div>
      <div>
        {!requestCompleted ? (
          <div className="mb-12">
            <h1 className="text-center text-xl">
              New Connection in{" "}
              <span className="text-[#ff1a8d] font-Archivo text-2xl underline underline-offset-4">
                {timer}
              </span>{" "}
              seconds
            </h1>
          </div>
        ) : (
          <div className="mb-12">
            <h1 className="text-center text-xl ">
              All connection requests have been sent for this page
            </h1>
          </div>
        )}
        <div className="relative flex justify-center items-center  text-xl z-40  font-semibold">
          <div
            className={`${
              isRunning ? "opacity-100" : "opacity-0"
            } transition duration-1000 mb-10 `}
          >
            <span
              className={` pulse-animation   transition duration-700 absolute left-auto bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#6366F1]  w-[100%] h-12  z-10 blur-[5px] `}
            />
            <span
              className={` pulse-animation   transition duration-700 absolute left-auto bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#6366F1]  w-[100%] h-12  z-10 blur-[10px] `}
            />
            <span
              className={` pulse-animation   transition duration-700 absolute left-auto bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#6366F1]  w-[100%] h-12  z-10 blur-[25px] `}
            />
            <span
              className={` pulse-animation   transition duration-700 absolute left-auto bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#6366F1]  w-[100%] h-12  z-10 blur-[40px] `}
            />
          </div>

          {!isRunning && (
            <button
              className=" w-[100%] py-2  transition duration-700 z-50 border-4 bg-[#dedede] text-[#292929] border-[#ffffff]"
              onClick={sendRequests}
            >
              START
            </button>
          )}

          {isRunning && (
            <button
              className="  w-[100%] py-2  transition duration-700 z-50  border-4 bg-[#dedede] text-[#292929] border-[#ffffff]"
              onClick={stopRequests}
            >
              STOP
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
