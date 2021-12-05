<template>
  <div class="terminal-container" @click="focus()">
    <div class="console">
      <div class="output-text" v-for="i in consoleText.length" :key="i">
        <span class="console-text">{{ consoleText[i - 1] }}</span
        ><span class="console-text">{{ modeText[i - 1] }}</span>
        <span :class="classData[i - 1]" class="user-text">
          {{ enterText[i - 1] }}</span
        >
      </div>
      <div class="userInput">
        {{ rootText }}
        <span style="color: white" v-if="inputData.length == 6"> +82) </span>
        <input
          :type="inputType"
          @keyup.enter="enter"
          id="inputBox"
          v-model="inputText"
          :class="{
            'text-color-red': signReg,
            'text-color-orange': reservedWord,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
import signHelp from "@/assets/signHelp.js";
export default {
  name: "Terminal",
  updated() {
    this.focus();
  },
  data() {
    return {
      rootText: `Kanboo bash(base console) > `,
      modeText: [`(base console) > `],
      consoleText: [`Kanboo bash`],
      enterText: [`Choose Menu 1.login 2.sign 3.find 4.clear 5.cd.. 6.cd home`],
      classData: [`com`],
      inputType: "text",
      inputData: [],
      inputText: "",
      signHelp: signHelp.en,
      signReg: false,
      reservedWord: false,
    };
  },
  watch: {
    inputText: "regex",
  },
  methods: {
    enter() {
      let data = this.inputText.toLowerCase();
      let originalData = this.inputText;
      if (data === "clear") {
        this.consoleText = [`Kanboo bash`];
        this.classData = [`com`];
        switch (this.inputData[0]) {
          case "login":
            this.modeText = [`(${this.inputData[0]} console) > `];
            if (this.inputData.length == 1) {
              this.enterText = [`Enter your ID`];
            } else if (this.inputData.length == 2) {
              this.enterText = [`Enter your Password`];
            }
            this.addLine(`(${this.inputData[0]} console) > `, data, "");
            return;
          case "sign":
            this.modeText = [`(${this.inputData[0]} console) > `];
            this.enterText = [`${this.signHelp[this.inputData.length - 1]}`];
            if (this.inputData.length == 5)
              this.classData[0] = [`text-color-red`];
            this.addLine(`(${this.inputData[0]} console) > `, data, "");
            return;
          case "find":
            this.modeText = [`(${this.inputData[0]} console) > `];
            this.enterText = [`Enter your Token`];
            this.addLine(`(${this.inputData[0]} console) > `, data, "");
            return;
          default:
            this.modeText = [`(base console) > `];
            this.enterText = [
              `Choose Menu 1.login 2.sign 3.find 4.clear 5.cd.. 6.cd home`,
            ];
            this.nothing(originalData);
            return;
        }
      }

      if (this.inputData.length > 0) {
        switch (data) {
          case "cd..":
          case "cd ..":
            this.goBack(originalData);
            break;
          case "cd home":
            this.addLine(`(${this.inputData[0]} console) > `, data, "");
            this.baseMode();
            break;
        }

        switch (this.inputData[0]) {
          case "login":
            this.loginMode(originalData);
            break;
          case "sign":
            this.signMode(originalData);
            break;
          case "find":
            this.findMode(originalData);
            break;
        }
      } else {
        switch (data) {
          case "login":
            this.loginMode(data, originalData);
            break;
          case "sign":
            this.signMode(data, originalData);
            break;
          case "find":
            this.findMode(data, originalData);
            break;
          default:
            this.nothing(originalData);
            break;
        }
      }
    },
    baseMode() {
      this.inputType = "text";
      this.rootText = `Kanboo bash(base console) > `;
      this.signReg = false;
      this.inputData.length = 0;
    },

    loginMode(data, originalData) {
      if (this.inputText == "") return;

      switch (this.inputData.length) {
        case 0:
          this.rootText = `Kanboo bash(login console) > `;
          this.inputData.push(data);
          this.addLine(`(base console) > `, originalData, "");
          this.addLine(`(login console) > `, `Enter your ID`, `com`);
          return;
        case 1:
          // 아이디 입력
          this.form(data, "ID");
          this.inputData.push(data);
          this.addLine(`(login console) > `, `Enter your PW`, `com`);
          this.inputType = "password";
          return;
        case 2:
          // 비밀번호 입력
          this.form(data, "PW");
          this.inputData.push(data);
          this.loginAccess();
          return;
      }
    },

    signMode(data, originalData) {
      if (this.signReg) return;
      switch (this.inputData.length) {
        case 0: // 아이디 입력 안내문
          this.rootText = `Kanboo bash(sign console) > `;
          this.inputData.push(data);
          this.addLine(`(base console) > `, originalData, "");
          this.addLine(`(sign console) > `, `${this.signHelp[0]}`, `com`);
          return;
        case 1:
          // 아이디 입력, 비밀번호 입력 안내문
          this.form(data, "ID");
          this.addLine(`(sign console) > `, `${this.signHelp[1]}`, `com`);
          this.inputData.push(data);
          this.inputType = "password";
          return;
        case 2:
          // 비번 입력 , 비밀번호 체크 안내문
          this.form(data, "PW");
          this.addLine(`(sign console) > `, `${this.signHelp[2]}`, `com`);
          this.inputData.push(data);
          this.inputType = "password";
          return;
        case 3:
          // 비번 확인 입력, 닉네임 입력 안내문
          this.form(data, "PWCheck");
          if (this.inputData[2] !== data) {
            this.addLine(`(sign console) > `, `${this.signHelp[2]}`, `com`);
            return;
          }
          this.addLine(`(sign console) > `, `${this.signHelp[3]}`, `com`);
          this.inputData.push(data);
          this.inputType = "text";
          return;
        case 4:
          // 닉네임 입력, 동의 확인
          this.form(data, "nickName");
          this.inputData.push(data);
          this.addLine(
            `(sign console) > `,
            `${this.signHelp[4]}`,
            `text-color-red`
          );
          this.inputType = "text";
          return;
        case 5:
          // 동의 확인 입력, 폰 입력 안내문
          this.form(data, "phoneChk");
          if ("Y" !== data && "y" !== data) {
            this.addLine(
              `(sign console) > `,
              `${this.signHelp[4]}`,
              `text-color-red`
            );
            return;
          }
          this.inputData.push(data);
          this.addLine(`(sign console) > `, `${this.signHelp[5]}`, `com`);
          return;
        case 6:
          // 저나번호 입력
          this.form(data, "phone");
          this.inputData.push(data);
          this.signAccess();
          break;
      }
    },
    findMode(data, originalData) {

      if(this.inputData == '') return;

      switch (this.inputData.length) {
        case 0:
          this.rootText = `Kanboo bash(find console) > `;
          this.addLine(`(base console) > `, originalData, "");
          this.inputData.push(data);
          this.addLine(`(find console) > `, `Enter your Token`, `com`);
          return;
        case 1:
          this.addLine(`(find console) > `, data, "");
          this.inputData.push(data);
          this.findUserInfo();
          this.baseMode();
          return;
      }
    },
    form(data, position) {
      switch (position) {
        case "PW":
        case "PWCheck":
          this.addLine(
            `(${this.inputData[0]} console) > `,
            this.printPW(data),
            ""
          );
          break;
        case "phone":
          data = `+82) ${data}`;

          this.addLine(`(${this.inputData[0]} console) > `, data, "");
          break;
        default:
          this.addLine(`(${this.inputData[0]} console) > `, data, "");
          break;
      }
    },
    nothing(data) {
      // 키워드 아닐때 그냥 추가
      this.addLine(`(base console) > `, data, "");
    },
    goBack(data) {
      // 뒤로 가기
      this.addLine(`(${this.inputData[0]} console) > `, data, "");
      this.inputData.pop();
      if (this.inputData.length === 0) {
        return this.baseMode();
      } else {
        switch (this.inputData[0]) {
          case "login":
            switch (this.inputData.length) {
              case 1:
                this.addLine(
                  `(${this.inputData[0]} console) > `,
                  `Enter your ID`,
                  `com`
                );
                return;
              case 2:
                this.addLine(
                  `(${this.inputData[0]} console) > `,
                  `Enter your PW`,
                  `com`
                );
                return;
              case 3:
                this.addLine(
                  `(${this.inputData[0]} console) > `,
                  `Enter your nickName`,
                  `com`
                );
                return;
            }
            return;
          case "sign":
            switch (this.inputData.length) {
              case 1: // 아이디 안내문 출력
                this.addLine(`(sign console) > `, `${this.signHelp[0]}`, `com`);
                this.inputType = "password";
                return;
              case 2: // 비번 안내문
                this.addLine(`(sign console) > `, `${this.signHelp[1]}`, `com`);
                this.inputType = "password";
                return;
              case 3: // 비번 확인 안내문
                this.addLine(`(sign console) > `, `${this.signHelp[1]}`, `com`);
                this.inputType = "text";
                this.inputData.pop();
                return;
              case 4: // nick 안내문
                this.addLine(`(sign console) > `, `${this.signHelp[3]}`, `com`);
                return;
              case 5: // nick 안내문
                this.addLine(`(sign console) > `, `${this.signHelp[3]}`, `com`);
                return;
            }
            return;
        }
      }
    },
    printPW(data) {
      // 비밀번호 ***로 표시
      var str = "";
      for (let i = 0; i < data.length; i++) {
        str += "•";
      }
      return str;
    },
    loginAccess() {
      this.addLine(`(login console) > `, `Loading...`, "com");
      // axios 통신 ㄱㄱ

      let loginInfo = {
        access: this.inputData[0],
        data: {
          id: this.inputData[1],
          pw: this.inputData[2],
        },
      };

      if (loginInfo.data.id) {
        this.addLine(`(login console) > `, `success`, `com`);
      } else {
        this.addLine(`(login console) > `, `fail`, `com`);
        this.addLine(`(base console) > `, `Choose Menu`, `com`);
      }
      this.baseMode();
    },

    signAccess() {
      this.addLine(`(sign console) > `, `Loading`, "com");

      let signInfo = {
        access: this.inputData[0],
        data: {
          id: this.inputData[1],
          pw: this.inputData[2],
          nick: this.inputData[3],
          phone: this.inputData[6],
        },
      };

      // axios 통신

      if (signInfo.data.id) {
        this.addLine(`(sign console) > `, `success`, `com`);
      } else {
        this.addLine(`(sign console) > `, `fail`, `com`);
        this.addLine(`(base console) > `, `Choose Menu`, `com`);
      }

      this.baseMode();
    },

    findUserInfo() {
      let findInfo = {
        access: this.inputData[0],
        data: [
          {
            token: this.inputData[1],
          },
        ],
      };
      console.log(findInfo);
      // 아이디 , 비번 찾는 로직
      this.addLine(`(find console) > `, `니 아이디는 폰으로 보냄 `, "com");
      this.baseMode();
    },

    addLine(mode, enter, classdata) {
      // 한줄 추가
      this.consoleText.push(`Kanboo bash`);
      this.modeText.push(mode);
      this.enterText.push(enter);
      this.classData.push(classdata);
      this.inputText = "";
    },
    focus() {
      document.getElementById("inputBox").focus();
      document.getElementById("inputBox").scrollIntoView();
    },
    regex() {
      let stringReg = /^[a-z0-9]{6,20}$/;
      let phoneReg = /(?:\d{3}|\d{4})-\d{4}$/;
      let words = [
        "login",
        "sign",
        "find",
        "clear",
        "cd..",
        "cd ..",
        "cd home",
      ];

      if (this.inputData.length > 0 && this.inputData[0] === "sign") {
        switch (this.inputData.length) {
          case 5:
            stringReg = false;
            break;
          case 6:
            this.signReg = !phoneReg.test(this.inputText);
            break;
          default:
            this.signReg = !stringReg.test(this.inputText);
            break;
        }
      }

      let target = this.inputText.toLowerCase();

      for (let word of words) {
        if (word === target) {
          this.inputType = "text";
          this.reservedWord = true;
          console.log(true)
          break;
        } else {
          this.reservedWord = false;
          if (this.inputData.length === 2 || this.inputData.length === 3) {
            this.inputType = "password";
          }
        }
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
  color: #00ab26;
  height: 100%;
  padding: 20px;
}

input {
  width: 78%;
  outline: none;
  border: none;
  color: #fff;
  background: #16161a;
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

.text-color-red {
  color: red;
}
.text-color-orange {
  color: darkorange;
}
</style>