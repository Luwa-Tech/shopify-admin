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
  const accordionItems = accordionPanel.querySelectorAll("[role='listitem']");
  const hiddenIcon = document.querySelector(".setup-guide__accordion--hidden-icon");
  const visibleIcon = document.querySelector(".setup-guide__accordion--visible-icon");
  const setupGuideListItems = document.querySelectorAll(".setup-guide__accordion--list");
  const progressBar = document.querySelector(".progress-bar-full");
  const progressText = document.querySelector(".progress-text");



  // -----------------Functions related to the notification list and its accessibility------------//

  // 1. close the notification bar when keyboard user presses the escape key. :FIXED
  const closeNotificationList = () => { 
    notificationListTrigger.ariaExpanded ="false";
    notificationListTrigger.focus()
  }

  const handleNotificationListEscapeKeyPress = (event) => {
    if (event.key === "Escape") {
      toggleNotificationList();
    }
  }

  const openNotificationList = () => {
    notificationListTrigger.ariaExpanded = "true";

    notificationListTrigger.addEventListener(
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





//-------------------- Functions related to the profile menu and its accessibility----------------//
  const closeMenu = () => {
    menuTrigger.ariaExpanded = "false";
    menuTrigger.focus();
  }

  const handleMenuEscapeKeypress = (event) => {
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






  //----------------- Function related to trial subscription handling------------------//
  const handleTrialSubscription = () => {
    trialSubscriptionButton.ariaExpanded = "false"
    trialSubscription.classList.toggle("remove");
  }






  //----------------------- Functions related to the setup guide list accordion and its accessibility--------------------------------//
  const closeAccordion = () => {
    accordionPanelButton.ariaExpanded = "false";
  }

  const openAccordion = () => {
    accordionPanelButton.ariaExpanded = "true";
  }

  const toggleAccordionPanel = () => {
    const setupGuideLiItems = document.querySelectorAll(".setup-guide__accordion--list");
    const firstSetupGuideLiItem = setupGuideLiItems[0];
    const hiddenContent = firstSetupGuideLiItem.querySelector(".setup-guide__accordion--content");
  

    const isAccordionExpanded = accordionPanelButton.attributes["aria-expanded"].value === "true";
    accordionPanel.classList.toggle("open-accordion");

    firstSetupGuideLiItem.classList.add("add-style");
    //firstSetupGuideLiItem.focus();
    hiddenContent.style.display = "block";


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
    setupGuideListItems.forEach((step, index) => {
      const completeBtn = step.querySelector(".setup-guide__complete-button");
      const hiddenContent = step.querySelector(".setup-guide__accordion--content");
      const defaultSVG = step.querySelector(".button-default");
      const completeSVG = step.querySelector(".button-complete");

      completeBtn.addEventListener("click", () => {
        //Toggle list style
        if (hiddenContent.style.display === "none" || hiddenContent.style.display === "") {

          //close other open step contents
          setupGuideListItems.forEach((s, i) => {
            const content = s.querySelector(".setup-guide__accordion--content");
            if (content !== hiddenContent) {
              content.style.display = "none";
              s.classList.remove("add-style");
            }
          })

          completeBtn.ariaExpanded = "true";
          hiddenContent.style.display = "block";
          step.classList.add("add-style");
        } else {
          completeBtn.ariaExpanded = "false";
          hiddenContent.style.display = "none";
          step.classList.remove("add-style");
        }

        if (!completeBtn.classList.contains("completed")) {
          completeBtn.classList.add("completed");
          incrementCompleteStep();

          defaultSVG.style.display = "none";
          completeSVG.style.display = "block";
        } else {
          completeBtn.classList.remove("completed");
          decrementCompleteStep();

          completeSVG.style.display = "none";
          defaultSVG.style.display = "block";
        }

      })
    })
  }


  const handleClickEventOnSetupGuideTitle = () => {
    setupGuideListItems.forEach((step, index) => {
      const accordionTitle = step.querySelector(".setup-guide__list-title");
      const hiddenContent = step.querySelector(".setup-guide__accordion--content");

      accordionTitle.addEventListener("click", () => {
        //Toggle list style
        if (hiddenContent.style.display === "none" || hiddenContent.style.display === "") {

          //close other open step contents
          setupGuideListItems.forEach((s, i) => {
            const content = s.querySelector(".setup-guide__accordion--content");
            if (content !== hiddenContent) {
              content.style.display = "none";
              s.classList.remove("add-style");
            }
          })

          accordionTitle.ariaExpanded = "true";
          hiddenContent.style.display = "block";
          step.classList.add("add-style");
        } else {
          accordionTitle.ariaExpanded = "false";
          hiddenContent.style.display = "none";
          step.classList.remove("add-style");
        }
      })
    })
  }



// Event listeners for various UI elements
  menuTrigger.addEventListener("click", toggleMenu);
  notificationListTrigger.addEventListener("click", toggleNotificationList);
  trialSubscriptionButton.addEventListener("click", handleTrialSubscription);
  accordionPanelButton.addEventListener("click", toggleAccordionPanel);
  toggleSetupGuideListAccordionButton();
  handleClickEventOnSetupGuideTitle();
}

//initialize app
app()


// 1. close the notification bar when keyboard user presses the escape key.
// 2. display the contents of the first setup guide step when all users open it and add focus to it.
// 5. add keyboard-users accessibility to setup guide items.
// 6. refactor and comment code.
// 7. check form focus issue.
// 8. add transitions to obvious elements. e.g accordion container and icons, 