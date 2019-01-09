# 面向对象
	☞ 面向对象就是把构成问题事物分解成多个对象，建立对象不是为了完成某个步骤，而是描述某个事物在这个解决问题的步骤中的行为。

		1.面向对象是一种思维方法

		2.面向对象是一种编程方法

		3.面向对象并不只针对某一种编程语言

  -- 对象：对象是一个整体，对外提供一些操作。
  -- 面向对象：使用对象时，只关注对象提供的功能，不关注其内部细节。
  -- JS的对象组成：方法和属性
		在JS中，有函数、方法、事件处理函数、构造函数，其实这四个都是函数，只是作用不同。函数是独立的存在，方法属于一个对象，事件处理函数用来处理一个事件，
		构造函数用来构造对象。
	-- JS中的this以及全局对象window

    1.通过Object 创建简单对象；
    2.用工厂方式来构造对象；
    3.使用new来创建JS对象；
    4.在function原型（prototype）上进行扩展 ———— 最终版；
  # 面向对象例子
  由面向过程改成面向对象步骤：
  init.html-------------------------------------- 一个简单的选项卡，也是我们常见的面向过程的创建形式。
  1.首先将嵌套的函数拿到window.onload外面，不能有函数嵌套，可以有全局变量。(代码变化见放firststep.html)
  firststep.html--------------------------------- 由面向过程转向面向对象第一步。
  2.将全局的变量变为对象的属性，全局的函数变为对象的方法；将window.onload里的代码提取到一个构造函数里面，在window.onload里创建对象即可；(下面的代码执行起来是有问题的)

  这里必须注意：在构造函数Tab里的this跟之前this所代表的是不同的(此处是通过new来创建对象的)；在上面的示例中，this指的是调用者；在构造函数里，this指向的是var tab = new Tab() ，即tab这个对象，注意是对象。

  说一下这段代码的问题：我们在Tab的原型上添加clickBtn方法后，clickBtn方法里的this本应该是指向var tab = new Tab()的，但是我们在第44行将clickBtn添加给了this.tabBtn[i]，即input按钮，clickBtn的所属由Tab对象变成了input按钮(第49行)。

  clickBtn的所属变成input按钮后，那么clickBtn里的this指向按钮，那再来看clickBtn里的代码，this.tabBtn、this.tabDiv，input按钮里有这两个属性吗？没有，所以会出错！

  secondstep.html-------------------------------- 由面向过程转向面向对象第二步。
  3.将clickBtn的调用放在一个函数里，这样就不会改变clickBtn的所属了。(下面的代码执行起来是有问题的)
  threestep.html--------------------------------- 由面向过程转向面向对象第三步。
  4.以参数的形式将点击的按钮传入clickBtn中；
  fourstep.html---------------------------------- 由面向过程转向面向对象第四步。

  /**其他例子**/
  再来简单总结一下JS面向对象中的this，this一般会在两种情况下出问题，一是使用定时器、二是事件，从上面的例子中也可以看出来。注意下面的说法是在构造函数里哦，其它情况下，this指向的是调用者。

  可以看到效果没有将姓名显示出来，其实看到这里原因应该很清楚了，就是第14行代码中this.name，此处的this指向谁？指向window，因为setInterval是属于window的。
  <!DOCTYPE html>
  <html>
      <meta charset="UTF-8" />
      <head>
          <script>
              
              function Person(name){
                  this.name = name;
                  //定时器
                  setInterval(this.showName, 3000);
              }
              Person.prototype.showName = function(){
                  alert(this); //window
                  alert("姓名："+this.name);
              }
              
              var p1 = new Person("jiangzhou");
              
          </script>
      </head>
  </html>
  解决办法：上面例子中已经列出来了，就是用一个function将要执行的代码包起来，使其所属关系不会发生变化，注意function里调用方法时使用的是外部变量'_this'。事件的处理在上面的例子中已经说明了。
  <!DOCTYPE html>
  <html>
      <meta charset="UTF-8" />
      <head>
          <script>
              
              function Person(name){
                  this.name = name;
                  
                  var _this = this;
                  
                  setInterval(function(){
                      _this.showName();
                  }, 3000);
              }
              Person.prototype.showName = function(){
                  alert(this); //[Object Object]
                  alert("姓名："+this.name); //姓名：jianghzou
              }
              
              var p1 = new Person("jiangzhou");不近人情
              
          </script>
      </head>
  </html>

# 再附上一个案例 ———— 拖拽
  原始的面向过程代码：
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <style>
          #box {
              width: 100px; 
              height: 100px; 
              background: blue; 
              position: absolute;
          }
      </style>
      <title>拖拽</title>
      <script>
          var oBox=null;
          var disX=0;
          var disY=0;
          
          window.onload=function(){
              oBox=document.getElementById('box');
              
              oBox.onmousedown=fnDown;
          };
          //鼠标按下事件
          function fnDown(ev){
              var oEvent = ev||event;
              disX = oEvent.clientX - oBox.offsetLeft;
              disY = oEvent.clientY - oBox.offsetTop;
              
              document.onmousemove = fnMove;
              document.onmouseup = fnUp;
          }
          //鼠标移动事件
          function fnMove(ev){
              var oEvent=ev||event;
              
              oBox.style.left = oEvent.clientX - disX + 'px';
              oBox.style.top = oEvent.clientY - disY + 'px';
          }
          //鼠标抬起事件
          function fnUp(){
              document.onmousemove = null;
              document.onmouseup = null;
          }
      </script>
    </head>

    <body>
        <div id="box"></div>
    </body>
  </html>
  下面是面向对象的代码
  drag.js

  /**
  * 拖拽
  * @param {Object} id div的id
  */
  function Drag(id){
      this.oBox = document.getElementById(id);
      this.disX = 0;
      this.disY = 0;
      
      var _this = this;
      
      this.oBox.onmousedown = function(){
          _this.fnDown();
      }
  }
  //鼠标按下
  Drag.prototype.fnDown = function(ev){
      var oEvent = ev || event;
      
      this.disX = oEvent.clientX - this.oBox.offsetLeft;
      this.disY = oEvent.clientY - this.oBox.offsetTop;
      
      var _this = this;
      
      document.onmousemove = function(){
          _this.fnMove();
      };
      document.onmouseup = function(){
          _this.fnUp();
      };
  }
  //鼠标移动
  Drag.prototype.fnMove = function(ev){
      var oEvent= ev || event;
      
      this.oBox.style.left = oEvent.clientX - this.disX + 'px';
      this.oBox.style.top = oEvent.clientY - this.disY + 'px';
  }
  //鼠标抬起
  Drag.prototype.fnUp = function(){
      document.onmousemove = null;
      document.onmouseup = null;
  }
  drag.html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <style>
        div {
          position: absolute;
        }
      </style>
      <title>拖拽</title>
      <script type="text/javascript" src="../js/drag.js" ></script>
      <script>
        window.onload = function(){
          var drag1 = new Drag("box1");
          
          var drag1 = new Drag("box2");
        };
      </script>
    </head>
    <body>
      <div id="box1" style="background: red;width: 200px;height: 200px;"></div>
      <div id="box2" style="background: blue;width: 100px;height: 300px;"></div>
    </body>
  </html>

# json方式的面向对象
  首先要知道，js中出现的东西都能够放到json中。关于json数据格式这里推荐一篇博客：JSON 数据格式
  先看下json创建的简单对象：相比基础篇中的构造函数、原型等的创建方式，json方式简单方便；但是缺点很明显，如果想创建多个对象，那么会产生大量重复代码，不可取。
  JSON方式适用于只创建一个对象的情况，代码简介又优雅。
    <!DOCTYPE html>
    <html>
			<head>
				<meta charset="UTF-8">
				<title></title>
				<script>
					var person = {
						name: "jiangzhou",
						age: 22,
						showName: function(){
							alert(this); //[Object Object]
							alert("姓名："+this.name);
						},
						showAge: function(){
							alert("年龄："+this.age);
						}
					};
					person.showName();
					person.showAge();
				</script>
			</head>
    </html>
  JSON在JS面向对象的应用中，主要的一个作用就是命名空间：如果有大量常用的js函数，利用json，我们可以将同一类函数放在一个“类”里，类似于java那样，这样我们就能很好的管理和查找使用这些js函数，看下面的例子就很好理解了。
    <!DOCTYPE html>
    <html>
			<head>
				<meta charset="UTF-8">
				<title></title>
				<script>
					//仿java.lang包
					var lang = {};
					
					/**
					* 仿java.lang.Math类
					*/
					lang.Math = {
						/**
						* 求绝对值
						* @param {Object} a
						*/
						abs: function(a){
							return a > 0 ? a : -a;
						},
						/**
						* 求最大值
						* @param {Object} a
						* @param {Object} b
						*/
						max: function(a, b){
							return a > b ? a : b;
						},
						/**
						* PI
						*/
						PI: 3.1415926
					}
					
					/**
					* 仿java.lang.String类
					*/
					lang.String = {
						/**
						* 求字符串长度
						* @param {Object} str
						*/
						length: function(str){
							return str.length;
						},
						/**
						* 将字符串转为小写
						* @param {Object} str
						*/
						toLowerCase: function(str){
							return str.toLowerCase();
						},
						/**
						* 将字符串转为大写
						* @param {Object} str
						*/
						toUpperCase: function(str){
							return str.toUpperCase();
						}
					}
					
					//调用
					alert(lang.Math.abs(-19)); //19
					alert(lang.Math.PI);
					alert(lang.String.toUpperCase("abcdefg")); //ABCDEFG			
				</script>
			</head>
    </html> 

# 面向对象的继承
	以案例篇中最后给出的拖拽例子来应用下继承，那个拖拽有问题，就是没有控制拖拽出边界的问题
	drag.js------------------------------------------------初始化拖拽
	drag.html----------------------------------------------初始化拖拽
	效果：可以看到红色和蓝色的都出边界了，但我们又不想去修改代码，那我们怎么做？学过java的应该都知道可以写一个子类来做一些更加具体的操作，又保留了父类的功能，就是继承。
	DragLimit.js--------------------------------------------DragLimit继承自Drag,控制了不能出边界
	DragLimit.html------------------------------------------DragLimit继承自Drag,控制了不能出边界

  https://www.cnblogs.com/chiangchou/p/js-oop1.html
  http://www.cnblogs.com/chiangchou/p/js-oop2.html
  http://www.cnblogs.com/chiangchou/p/js-oop3.html

# 面向对象与面向过程的区别
 
	-- 面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候一个一个依次调用就可以了。（面向过程过程侧重整个问题的解决步骤，着眼局部或者具体）

	-- 面向对象是把构成问题事务分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描述某个事物在整个解决问题的步骤中的行为。（面向对象侧重具体的功 	 能，让某个对象具有这样的功能。更加侧重于整体。）

	各自的优缺点：
​
	面向过程的优点：
		流程化使得编程任务明确，在开发之前基本考虑实现的方法和最终结果；
		效率高，面向过程强调代码的短小精悍，善于结合数据结构来开发高效率程序；
		流程明确，具体步骤清楚，便于节点分析。
							
	面向过程的缺点：
		需要深入的思考，耗费精力，代码重用性低，扩展能力差，维护起来难度比较高，对复杂业务来说，面向过程的模块难度较高，耦合度也比较高。
​
	面向对象的优点：
		结构清晰，程序便于模块化，结构化，抽象化，更加符合人类的思维方式；
		封装性，将事务高度抽象，从而便于流程中的行为分析，也便于操作和自省； 
		容易扩展，代码重用率高，可继承，可覆盖；
		实现简单，可有效地减少程序的维护工作量，软件开发效率高。
​
	面向对象的缺点是：
		效率低，面向对象在面向过程的基础上高度抽象，从而和代码底层的直接交互非常少机会，从而不适合底层开发和游戏甚至多媒体开发；
		复杂性，对于事务开发而言，事务本身是面向过程的，过度的封装导致事务本身的复杂性提高。

# 面向对象的特征
    --  封装、 继承、 多态
