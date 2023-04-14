const runPlugin = (utils, data) => {
  console.log("My Plugn: runPlugin()");
  console.log({ utils, data });

  return {
    pluginInitialisation: (pluginUtils) => {
      console.log("My Plugn: pluginInitialisation()");
      console.log({ pluginUtils });
      const buttonBox = createButtonBox();

      //   pluginUtils.playerInterface.container.parentNode.appendChild(buttonBox);
      document.getElementById("mediaPlayer").appendChild(buttonBox);
    },
  };
};

function createButtonBox() {
  const button = document.createElement("button");
  button.onmouseover = () => {
    console.log("mouseover");
  };
  button.innerText = "click me";
  button.onclick = (e) => {
    alert("Player click!");
    e.stopPropagation();
    e.preventDefault();
  };

  const buttonBox = document.createElement("div");
  buttonBox.appendChild(button);
  buttonBox.style.cssText =
    "position: fixed; top:8px; left:8px; height: 270px; width: 480px; background-color: yellow;  z-index:10001; display: flex; justify-content: center; align-items: center;";

  return buttonBox;
}
