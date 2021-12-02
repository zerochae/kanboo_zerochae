<template>
  <div class="terminal-container">
    <div class="console">
      <div class="output-text" v-for="i in consoleText.length" :key="i">
        <span class="console-text">{{ consoleText[i - 1] }}</span
        ><span class="console-text">{{ modeText[i - 1] }}</span>
        <span :class="classData[i - 1]" class="user-text">{{
          enterText[i - 1]
        }}</span>
      </div>
      <div class="userInput">
        <span>{{ rootText }}</span>
        <span class="userIn">
          <input
            :type="inputType"
            @keyup.enter="enter"
            @input="setText"
            id="inputBox"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
/*bash text
position text
computer text
user text

- login
- sign
- find
*/

export default {
  name: "Terminal",
  updated() {
    document.getElementById("inputBox").focus();
    document.getElementById("inputBox").value = "";
  },
  data() {
    return {
      rootText: `Kanboo bash(base console) > `,
      modeText: [`(base console) > `],
      consoleText: [`Kanboo bash`],
      enterText: [`Choose Menu`],
      classData: [`com`],
      isLogin: false,
      isSign: false,
      isFind: false,
      step1: false,
      step2: false,
      step3: false,
      inputType: "text",
      loginInfo: {},
      signInfo: {},
      findInfo: {},
      inputText: "",
    };
  },
  methods: {
    setText(e) {
      this.inputText = e.target.value;
    },
    enter() {
      let data = this.inputText;

      if (this.isLogin) {
        this.loginMode(data);
        return;
      } else if (this.isSign) {
        this.signMode(data);
        return;
      } else if (this.isFind) {
        this.findMode(data);
        return;
      }

      switch (data) {
        case "sign":
          this.signMode(data);
          break;
        case "login":
          this.loginMode(data);
          break;
        case "find":
          this.findMode(data);
          break;
        default:
          this.nothing(data);
          break;
      }
    },
    form(data, position) {
      switch (position) {
        case "ID":
          this.addLine(`(login console) > `, data, "");
          this.loginInfo.userId = data;
          break;
        case "PW":
          var str = "";
          for (let i = 0; i < data.length; i++) {
            str += "•";
          }
          this.addLine(`(sign console) > `, str, "");
          this.loginInfo.userPw = data;
          break;
        case "nickName":
          this.addLine(`(login console) > `, data, "");
          this.signInfo.userNickName = data;
          break;
      }
    },
    nothing(data) {
      this.addLine(`(base console) > `, data, "");
    },

    loginAccess(loginInfo) {
      this.addLine(`(login console) > `, `Loading...`, "com");
      // axios 통신 ㄱㄱ
      console.log(loginInfo);
      if (loginInfo.userId) {
        this.addLine(`(login console) > `, `success`, `com`);
      } else {
        this.addLine(`(login console) > `, `fail`, `com`);
        this.addLine(`(base console) > `, `Choose Menu`, `com`);
      }
      this.baseMode();
    },

    signAccess(signInfo) {
      this.addLine(`(sign console) > `, `Loading`, "com");
      console.log(signInfo);
      if (signInfo.userId) {
        this.addLine(`(sign console) > `, `success`, `com`);
      } else {
        this.addLine(`(sign console) > `, `fail`, `com`);
        this.addLine(`(base console) > `, `Choose Menu`, `com`);
      }
      this.baseMode();
    },

    getID(data) {
      console.log(data);
      // 아이디 찾는 로직
      let id = "zerochae";
      this.addLine(`(find console) > `, `니 아이디는 ${id} `, "com");
    },

    getPW(data) {
      console.log(data);
      // 비번 찾는 로직
      let pw = "1234";
      this.addLine(`(find console) > `, `니 비번 ${pw} `, "com");
    },

    addLine(mode, enter, classdata) {
      this.consoleText.push(`Kanboo bash`);
      this.modeText.push(mode);
      this.enterText.push(enter);
      this.classData.push(classdata);
      this.inputText = "";
    },

    baseMode() {
      this.isLogin = false;
      this.isSign = false;
      this.isFind = false;
      this.step1 = false;
      this.step2 = false;
      this.inputType = "text";
      this.rootText = `Kanboo bash(base console) > `;
    },

    loginMode(data) {
      if (this.isLogin) {
        if (this.step1) {
          this.form(data, "PW");
          this.loginAccess(this.loginInfo);
          return;
        }
        this.form(data, "ID");
        this.addLine(`(login console) > `, `Enter your PW`, `com`);
        this.inputType = "password";
        this.step1 = true;
        return;
      } else {
        this.rootText = `Kanboo bash(login console) > `;
        this.addLine(`(base console) > `, data, "");
        this.isLogin = true;
        this.addLine(`(login console) > `, `Enter your ID`, `com`);
        return;
      }
    },

    signMode(data) {
      if (this.isSign) {
        if (this.step2) {
          this.form(data, "nickName");
          this.signAccess(this.signInfo);
          return;
        } else if (this.step1) {
          this.form(data, "PW");
          this.addLine(`(sign console) > `, `Enter your nickName`, `com`);
          this.step2 = true;
          this.inputType = "text";
          return;
        }
        this.form(data, "ID");
        this.addLine(`(sign console) > `, `Enter your PW`, `com`);
        this.inputType = "password";
        this.step1 = true;
        return;
      } else {
        this.rootText = `Kanboo bash(sign console) > `;
        this.addLine(`(base console) > `, data, "");
        this.isSign = true;
        this.addLine(`(sign console) > `, `Enter your ID`, `com`);
        return;
      }
    },
    findMode(data) {
      if (this.isFind) {
        if (this.step2) {
          this.addLine(`(find console) > `, data, "");
          this.findInfo.userId = data;
          this.getPW(this.findInfo);
          this.baseMode();
          return;
        } else if (this.step1) {
          this.addLine(`(find console) > `, data, "");
          this.findInfo.userNickName = data;
          this.getID(this.findInfo);
          this.baseMode();
          return;
        }

        switch (data) {
          case "ID":
            this.addLine(`(find console) > `, data, "");
            this.addLine(`(find console) > `, `Enter your ToKen`, `com`);
            this.step1 = true;
            break;
          case "PW":
            this.addLine(`(find console) > `, data, "");
            this.addLine(`(find console) > `, `Enter your ToKen`, `com`);
            this.step2 = true;
            break;
        }
      } else {
        this.rootText = `Kanboo bash(find console) > `;
        this.addLine(`(base console) > `, data, "");
        this.isFind = true;
        this.addLine(`(find console) > `, `ID or PW ?`, `com`);
      }
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "NeoDunggeunmo";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmo.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

* {
  font-family: "NeoDunggeunmo";
  font-size: 22px;
}

.terminal-container {
  height: calc(100vh - 70px);
}

.console {
  background: black;
  color: #00ab26;
  height: 100%;
  padding: 20px;
}

input {
  width: fit-content;
  outline: none;
  border: none;
  color: #fff;
  background: black;
}

.userIn {
  color: #fff;
}

.user-text {
  color: #fff;
}

.console-text {
  color: #00ab26;
}

.com {
  color: #00ab26;
}
</style>