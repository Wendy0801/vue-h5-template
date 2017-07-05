#!/user/bin/env node

var fs = require("fs");
var path = require('path');

let order = process.argv[2];
let createName = process.argv[3];
// 添加页面
if (!order) {
  return false;
}
if (order === 'page' || order === 'component') { // node wx page index => 创建 `/ROOT_PATH/pages/${createName}`目录,写下面包括几个必须文件
  if (!createName) {
    return false;
  } else {
    let _dir = ''
    if(order==='page'){
      _dir = `${__dirname}/src/${order}s/${createName}`
    }
    else if(order==='component'){
      _dir = `${__dirname}/src/${order}s/${createName}.vue`
    }
    checkIsExit(_dir).then(res => {
        if (order === 'page') {
          fs.mkdir(_dir, '0777', function () {
            addFiles();
          });
        } else {
          addFiles();
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}

function checkIsExit(dir) {
  return new Promise((resolve, reject) => {
    fs.exists(dir, result => {
      if (result) {
        reject('文件已经存在')
      } else {
        resolve(true)
      }
    })
  })
}

const vueText = `
<template>
    <div>

    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data(){
      return {

      }
  },
  computed: {
    ...mapState({
      projects: state => state.activity.projects,
    })
  },
  mounted(){

  },
  methods : {

  }
}
</script>
<style lang="scss" src="./${createName}.scss" scoped></style>
`;

const styleText = `
@import '../../themes/_variable.scss' ;
`;

const jsonText = `{
    "navigationBarTitleText": "test"
}
`;

const componentText = `
<template>
  <div>

  </div>
</template>
<script>
export default {
  props: [

  ],
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="scss">

</style>
`
//
function addFiles() {
  let filePath = `${__dirname}/src/${order}s/${createName}`;
  if (order === 'page') {
    fs.writeFile(`${filePath}/${createName}.vue`, vueText, function (err) {

    })
    fs.writeFile(`${filePath}/${createName}.scss`, styleText, function (err) {
      console.log('页面创建完成!');
    })

  } else if (order === 'component') {
    fs.writeFile(`${filePath}.vue`, componentText, function (err) {
      console.log('组件创建完成!');
    })
  }
}
