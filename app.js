const app = () => {
  const notificationListTrigger = document.querySelector(".nav__notification-button");
  const notificationList = document.querySelector(".nav__notification--list");
  const menuTrigger = document.querySelector(".nav__profile-menu-button");
  const profileMenu = document.querySelector(".nav__profile-menu--content");
  const menuItems = profileMenu.querySelectorAll(
    '[role="menuitem"]'
  );
  const trialSubscriptionButton = document.querySelector(".trial-subscription__remove-button");
  const trialSubscription = document.querySelector(".trial-subscription__container");
  const accordionPanelButton = document.querySelector(".setup-guide__accordion--button");
  const accordionPanel = document.querySelector(".setup-guide__accordion");
  const hiddenIcon = document.querySelector(".setup-guide__accordion--hidden-icon");
  const visibleIcon = document.querySelector(".setup-guide__accordion--visible-icon");
  const setupGuideListAccordionTriggers = document.querySelectorAll(".setup-guide__list-title");
  const setupGuideListAccordionContents = document.querySelectorAll(".setup-guide__accordion--content");
  const setupGuideListItems = document.querySelectorAll(".setup-guide__accordion--list");
  // const setupGuideCompleteButtons = document.querySelectorAll(".setup-guide__complete-button");
  const progressBar = document.querySelector(".progress-bar-full");
  const progressText = document.querySelector(".progress-text");



  //notification list and its accessibility section

  const closeNotificationList = () => {
    notificationListTrigger.ariaExpanded = "false";
    notificationListTrigger.focus()
  }

  const handleNotificationListEscapeKeyPress = (event) => {
    if (event.key === "Escape") {
      toggleNotificationList();
    }
  }

  const openNotificationList = () => {
    notificationListTrigger.ariaExpanded = "true";

    notificationList.addEventListener(
      "keyup",
      handleNotificationListEscapeKeyPress
    );
  }

  const toggleNotificationList = () => {
    const isListExpanded = notificationListTrigger.attributes["aria-expanded"].value === "true";
    notificationList.classList.toggle("active");

    if (isListExpanded) {
      closeNotificationList();
    } else {
      openNotificationList();
    }
  }




//profile menu and its accessibility section

  const closeMenu = () => {
    menuTrigger.ariaExpanded = "false";
    menuTrigger.focus();
  }

  const handleMenuEscapeKeypress = (event) => {
    // if user pressed escape key
    if (event.key === "Escape") {
      toggleMenu();
    }
  }

  const handleMenuItemArrowKeyPress = (event, itemIndex) => {
    const isLastMenuItem = itemIndex === menuItems.length - 1;
    const isFirstMenuItem = itemIndex === 0;

    const nextMenuItem = menuItems.item(itemIndex + 1);
    const previousMenuItem = menuItems.item(itemIndex - 1);

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      if (isLastMenuItem) {
        menuItems.item(0).focus();
        return;
      }
      nextMenuItem.focus();
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    if (isFirstMenuItem) {
        menuItems.item(menuItems.length - 1).focus();
        return;
      }
      previousMenuItem.focus();
    }
  }

  const openMenu = () => {
    menuTrigger.ariaExpanded = "true";
    menuItems.item(0).focus();

    profileMenu.addEventListener(
      "keyup",
      handleMenuEscapeKeypress
    );

    // for each menu item, register an event listener for the keyup event
    menuItems.forEach((item, itemIndex) => {
      item.addEventListener("keyup", (event) => {
        handleMenuItemArrowKeyPress(event, itemIndex);
      });
    });
  }

  const toggleMenu = () => {
    const isMenuExpanded =
    menuTrigger.attributes["aria-expanded"].value === "true";
    profileMenu.classList.toggle("active");

    if (isMenuExpanded) {
      closeMenu();
    } else {
      openMenu();
    }
  }


//subscription trial handler
  const handleTrialSubscription = () => {
    trialSubscriptionButton.ariaExpanded = "false"
    trialSubscription.classList.toggle("remove");
  }



  //list accordion and its acessibility section
  const closeAccordion = () => {
    accordionPanelButton.ariaExpanded = "false";
  }

  const openAccordion = () => {
    accordionPanelButton.ariaExpanded = "true";
  }

  const toggleAccordionPanel = () => {
    const isAccordionExpanded = accordionPanelButton.attributes["aria-expanded"].value === "true";
    accordionPanel.classList.toggle("open-accordion");

    if (isAccordionExpanded) {
      closeAccordion();
    } else {
      openAccordion();
    }

    if (hiddenIcon.style.display !== "none") {
      hiddenIcon.style.display = "none";
      visibleIcon.style.display = "inline-block";
    } else {
      hiddenIcon.style.display = "inline-block";
      visibleIcon.style.display = "none";
    }
  }

  const addToggleToAccordionContent = (content, trigger) => {
    trigger.setAttribute('aria-expanded', "true");
    content.classList.toggle("active");
  }

  const removeToggleToAccordionContent = (content, trigger) => {
    trigger.setAttribute('aria-expanded', "false");
    content.classList.remove("active");
  }


  // 3i. when user clicks on the complete button, open the contents associated with the button, increase the number of steps completed and update the progress bar.
// 3ii. when user clicks the complete button again, decrease number of completed steps and update the progress bar.

  let currentStep = 0;
  const totalSteps = setupGuideListItems.length;

  const updateProgress = () => {
    const percentage = (currentStep / totalSteps) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.textContent = `${currentStep} / ${totalSteps} completed`;
  }

  const incrementCompleteStep = () => {
    if (currentStep < totalSteps) {
      currentStep++;
      updateProgress();
    }
  }

  const decrementCompleteStep = () => {
    if (currentStep > 0) {
      currentStep--;
      updateProgress();
    }
  }

  const toggleSetupGuideListAccordionButton = () => {
    // setupGuideListItems.forEach((step, index) => {
    //   const completeButton = step.querySelector(".setup-guide__complete-button");
    //   completeButton.addEventListener("click", () => {
          // if(!step.classList.contains("completed")) {
          //   step.classList.add("completed");
          //   incrementCompleteStep();
          // } else {
          //   step.classList.remove("completed");
          //   decrementCompleteStep();
          // }
    //   });
    // });

    setupGuideListItems.forEach((step, index) => {
      const completeBtn = step.querySelector(".setup-guide__complete-button");
      const hiddenContent = step.querySelector(".setup-guide__accordion--content");

      completeBtn.addEventListener("click", () => {
        //Toggle list style
        if (hiddenContent.style.display === "none" || hiddenContent.style.display === "") {
          hiddenContent.style.display = "block";
          step.classList.add("add-style");
        } else {
          hiddenContent.style.display = "none";
          step.classList.remove("add-style");
        }

        if(!step.classList.contains("completed")) {
          step.classList.add("completed");
          incrementCompleteStep();
        } else {
          step.classList.remove("completed");
          decrementCompleteStep();
        }

      })
    })
  }


  // .setup-guide__accordion--content
  setupGuideListAccordionTriggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      setupGuideListAccordionContents.forEach((content, contentIndex) => {
        if (index === contentIndex) {
          addToggleToAccordionContent(content, trigger);
        } else {
          removeToggleToAccordionContent(content, trigger);
        }
      });
    });
  });
//create a helper function that coma





  menuTrigger.addEventListener("click", toggleMenu);
  notificationListTrigger.addEventListener("click", toggleNotificationList);
  trialSubscriptionButton.addEventListener("click", handleTrialSubscription);
  accordionPanelButton.addEventListener("click", toggleAccordionPanel);
  toggleSetupGuideListAccordionButton();
}

//load app
app()


// 1. close the notification bar when keyboard user presses the escape key.
// 2. display the contents of the first setup guide step when all users open it.

// 4. fix "add your first product" section button.
// 5. add keyboard-users accessibility to setup guide items.


    // setupGuideCompleteButtons.forEach((button, index) => {
    //   button.addEventListener("click", () => {
    //     setupGuideListAccordionContents.forEach((content, contentIndex) => {
    //       if (index === contentIndex) {
    //         content.classList.toggle("active");
    //       } else {
    //         content.classList.remove("active");
    //       }
    //     });
    //   })
    // })