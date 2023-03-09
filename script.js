const questionOneItems = document.querySelectorAll("#questionOne > ul >li");
const questionTwoItems = document.querySelectorAll("#questionTwo > ul >li");
const questionTwo = document.querySelector("#questionTwo");
const motionState = window.matchMedia("(prefers-reduced-motion: reduce)");

window.addEventListener("load", (event) => {
      questionOneItems.forEach((item) => {
        item.addEventListener("click", toQuestionTwo);
      });


      $("#quiz-form").submit(function() {
        getCharacter();
        return false;
      });

      function respectMotionPreference(e) {
        if (motionState.matches === true) {
          e.scrollIntoView({
            block: "start"
          });
        } else {
          e.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }

      function toQuestionTwo() {
        respectMotionPreference(document.querySelector("#questionTwo"));
      }


      function getCharacter() {
        respectMotionPreference(document.querySelector("#results"));
        fadeOut(document.querySelector("#submit"));
        fadeIn(document.querySelector(".loading-wrapper"));

        const handleError = (response) => {
          if (!response.ok) {
            throw Error(`${response.status} ${response.statusText}`);
          } else {
            return response.json();
          }
        };

        const answerOne = Number(
          document.querySelector('input[name="one"]:checked').value
        );
        const answerTwo = Number(
          document.querySelector('input[name="two"]:checked').value
        );

        fetch("https://jimlin1111.autocode.dev/boa-how-to@dev//", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              answerOne: answerOne,
              answerTwo: answerTwo,
            }),
          })
          .then(handleError)
          .then((data) => {
            console.log(data);
            document.querySelector("#resultName").innerText = data.fields.resultName;
            document.querySelector("#resultDescription").innerText =
              data.fields.resultDescription;
            document.querySelector("#resultImage").src = data.fields.resultImage;
          })
          .catch(function writeError(err) {
            console.log(err);
          })
          .finally(() => {
            fadeOut(document.querySelector(".loading-wrapper"));
            fadeIn(document.querySelector(".results-wrapper"));
            respectMotionPreference(document.querySelector("#results"));
            document.querySelector(".results-wrapper").setAttribute("tabindex", "-1");
            document.querySelector(".results-wrapper").focus();
          });
      }

      function fadeOut(e) {
        e.style.transition = "opacity 0.5s";
        e.style.opacity = 0;
        setTimeout(() => {
          e.style.display = "none";
        }, 700);
      }

      function fadeIn(e) {
        e.style.opacity = 0;
        e.style.display = "block";
        e.style.transition = "opacity 0.5s";
        setTimeout(() => {
          e.style.opacity = 1;
        }, 500);
      }
