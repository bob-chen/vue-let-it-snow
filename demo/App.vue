<template>
  <div id="app">
	
	<let-it-snow
      v-bind="snowConf"
      :show="show"    
    ></let-it-snow>
	
    <div class="wrapper">
        <div class="main">
            <div class="header">
                <h1>Vue Let It Snow</h1>
                <h2>Support Draw Multiple Images</h2>
                <p class="credit">Base on <a href="https://github.com/peachananr/let_it_snow">peachananr/let_it_snow</a>, <br /> remove the jQuery dependence to support Vue and  update to support draw multiple images</p>
                <div class="btns">
                    <a class="reload btn" href="https://github.com/bob-chen/vue-let-it-snow">Download on Github</a>
                </div>
            </div>    
        </div>
        
        <a class="back" href="https://github.com/bob-chen/vue-let-it-snow">Back to The Repo</a>
        <a href="https://github.com/bob-chen/vue-let-it-snow"><img style="position: absolute; top: 0; right: 0; border: 0; z-index: 15;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>
    </div>    
    
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
  	return {
        snowConf: {
            windPower : 1,
            speed : 3,
            count : 12,
            size : 10,
            opacity : 1,
            images: ['https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/snow.png',
                    'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/sock.png',
                    'https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/tree.png']
        },
        show: false      
    }
  },
  mounted () {
      this.show = true
    //   setTimeout( () => {
    //       this.show = false
    //   }, 5000)

    //   setTimeout( () => {
    //       this.show = true
    //   }, 10000)      
  }  
}
</script>

<style lang="scss">
    html {
      height: 100%;
    }
    body {
      background: #090b44; /* Old browsers */
      background: -moz-radial-gradient(center, ellipse cover, #090b44 0%, #00001c 100%); /* FF3.6+ */
      background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,#090b44), color-stop(100%,#00001c)); /* Chrome,Safari4+ */
      background: -webkit-radial-gradient(center, ellipse cover, #090b44 0%,#00001c 100%); /* Chrome10+,Safari5.1+ */
      background: -o-radial-gradient(center, ellipse cover, #090b44 0%,#00001c 100%); /* Opera 12+ */
      background: -ms-radial-gradient(center, ellipse cover, #090b44 0%,#00001c 100%); /* IE10+ */
      background: radial-gradient(ellipse at center, #090b44 0%,#00001c 100%); /* W3C */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#090b44', endColorstr='#00001c',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
      padding: 0;
      text-align: center;
      font-family: 'open sans';
      position: relative;
      margin: 0;
      height: 100%;
      padding-bottom: 50px;
    }
    
    .wrapper {
    	height: auto !important;
    	height: 100%;
    	margin: 0 auto; 
    	overflow: hidden;
    }
    
    a {
      text-decoration: none;
    }
    
    
    h1, h2 {
      width: 100%;
      float: left;
    }
    h1 {
      margin-top: 100px;
      color: #1D3185;
      text-shadow: 0 1px 5px rgba(0,0,0,0.5);
      margin-bottom: 5px;
      font-size: 70px;
      letter-spacing: -4px;
    }
    h2 {
      color: #3C487A;
      font-weight: bold;
      margin-top: 0;
      margin-bottom: 10px;
    }
    
    .pointer {
      position: fixed;
      bottom: 10px;
      left: 50%;
      margin-left: -245px;
      color: #2744BE;
      font-family: 'Open Sans', cursive;
      font-weight: bold;
      font-size: 14px;
      margin-top: 15px;
    }
    pre {
      margin: 80px auto;
    }
    pre code {
      padding: 35px;
      border-radius: 5px;
      font-size: 15px;
      background: rgba(0,0,0,0.1);
      border: rgba(0,0,0,0.05) 5px solid;
      max-width: 500px;
    }
    .main {
      float: left;
      width: 100%;
      margin: 0 auto;
    }
    
    .main h1 {
      padding:20px 50px;
      float: left;
      width: 100%;
      font-size: 60px;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      font-weight: 100;
      margin: 0;
      padding-top: 25px;
      font-family: 'Pacifico';
      letter-spacing: 2px;
    }
   
    .main h1.demo1 {
      background: #1ABC9C;
    }
    
    .reload.bell {
      font-size: 12px;
      padding: 20px;
      width: 45px;
      text-align: center;
      height: 47px;
      border-radius: 50px;
      -webkit-border-radius: 50px;
      -moz-border-radius: 50px;
    }
    
    .reload.bell #notification {
      font-size: 25px;
      line-height: 140%;
    }
    
    .reload, .btn{
      display: inline-block;
      border: 4px solid #A2261E;
      border-radius: 5px;
      -moz-border-radius: 5px;
      -webkit-border-radius: 5px;
      background: #CC3126;
      display: inline-block;
      line-height: 100%;
      padding: 0.7em;
      text-decoration: none;
      color: #2744BE;
      width: 100px;
      line-height: 140%;
      font-size: 17px;
      font-family: open sans;
      font-weight: bold;
    }
    .reload:hover{
      background: #A2261E;
    }
    .btn {
      width: 200px;
      color: #2744BE;
      border: none;
      margin-left: 10px;
      background: rgba(0, 0, 0, 0.31);
    }
    .clear {
      width: auto;
    }
    .btn:hover, .btn:hover {
      background: rgba(0,0,0,0.5);
    }
    .btns {
      width: 410px;
      margin: 50px auto;
    }
    .credit {
      font-style: italic;
      text-align: center;
      color: #1D3185;
      padding: 10px;
      margin: 0 0 40px 0;
      float: left;
      width: 100%;
    }
    .credit a {
      color: #2744BE;
      text-decoration: none;
      font-weight: bold;
    }
    
    .back {
      position: absolute;
      top: 0;
      left: 0;
      text-align: center;
      display: block;
      padding: 7px;
      width: 100%;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      background: rgba(0, 0, 0, 0.35);
      font-weight: bold;
      font-size: 13px;
      color: #2744BE;
      -webkit-transition: all 200ms ease-out;
      -moz-transition: all 200ms ease-out;
      -o-transition: all 200ms ease-out;
      transition: all 200ms ease-out;
    }
    .back:hover {
      background: rgba(0, 0, 0, 0.85);
    }

    .header {
      position: relative;
    }


</style>
