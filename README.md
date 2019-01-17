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

# 面向对象的实现方式
	☞ 面向对象的实现主流有两种方式：基于类的面向对象和基于原型的面向对象。
	☞ 面向对象三大特征：

	● 封装

	也就是把客观事物封装成抽象的类或具体的对象，并且类或对象可以把自己的数据和方法只让可信的类或者对象操作，对不可信的进行信息隐藏。

	● 继承

	可以让某个类型的对象获得另一个类型的对象的属性的方法

	● 多态

	不同实例的相同方法在不同情形有不同表现形式。多态机制使具有不同内部结构的对象可以共享相同的外部接口。

	3.1 基于类的面向对象
	☞ 典型的语言：Java、C#

	对象（object）依靠 类（class)来产生

	3.2 基于原型的面向对象
	☞ 典型的语言：JavaScript

	对象（object）则是依靠 构造器（constructor）利用 原型（prototype）构造出来的

# 多种创建对象的方式 
	-- 使用new Object()创建
	-- 工厂模式创建
		☞ 工厂模式是软件工程领域一种广为人知的设计模式，这种模式抽象了创建具体对象的过程，考虑到在 ECMAScript 中无法创建类，开发人员就发明了一种函数，用函数来封装以特定接口创建对象的细节。
	-- 构造函数模式创建
		☞ 为了解决对象类型识别问题，又提出了构造函数模式。这种模式，其实在我们创建一些原生对象的时候，比如Array、Object都是调用的他们的构造函数。
		  <script type="text/javascript">
				function Person (name, age, sex) {
					this.name = name;
	     
					this.age = age;
					this.sex = sex;
	       
					this.eat = function () {
						alert(this.name + " Eat food");
					}
				}
				var p1 = new Person("Jack", 20, "man");
				p1.eat();   //Jack Eat food
				var p1 = new Person("Mark", 30, "man");
				p1.eat();   //Mark Eat food
				alert(p1 instanceof Person);    
			</script>

# 构造函数与普通函数的关系

	1.他们都是函数。构造函数也是函数，也可以像普通的函数一样进行调用。 做普通函数调用的时候，因为没有创建新的对象，所以this其实指向了window对象。			

		function Person(){
			this.name = "Jack"; // 把name属性添加到了window对象上面
			alert(this === window);  //如果不作为构造方法调用，则 是true
		}
		Person();  // 把构造函数当做普通方法调用。这个时候内部的this指向了weindow
		alert(window.name);  //Jack
		function Human(){
			this.name = "Mark";
			alert(this instanceof window);  // false
			alert(this instanceof Human);  //true
		}
		var h = new Human();  //当做构造函数来调用，创建一个对象
		alert(h.name);
	
	2.构造函数和普通函数仅仅也仅仅是调用方式的不同。也就是说，随便一个函数你如果用new 的方式去使用，那么他就是一个构造函数。

	3.为了区别，如果一个函数想作为构造函数，作为国际惯例，最好把这个构造函数的首字母大写。

# 原型理解
	-- 什么是原型
		☞ 原型就是JavaScript中的继承的继承，JavaScript的继承就是基于原型的继承。
	-- 与原型有关的几个属性和方法
	  -- prototype属性
			☞ prototype 存在于构造函数中 (其实任意函数中都有，只不过不是构造函数的时候prototype我们不关注而已) ，他指向了这个构造函数的原型对象。

		-- constructor属性
			☞ constructor属性存在于原型对象中，它指向了构造函数  
			<script type="text/javascript">
				function Person () {
				}
				alert(Person.prototype.constructor === Person); // true
				var p1 = new Person();
				//使用instanceof 操作符可以判断一个对象的类型。  
				//typeof一般用来获取简单类型和函数。而引用类型一般使用instanceof，因为引用类型用typeof 总是返回object。
				alert(p1 instanceof Person);    // true
				alert(typeof p1); // object
			</script>

			1. 我们根据需要，可以为Person.prototype 属性指定新的对象，来作为Person的原型对象。

			2. 但是这个时候有个问题，新的对象的constructor属性则不再指向Person构造函数了。

	-- __proto__属性(注意：左右各是2个下划线)
		☞ 用构造方法创建一个新的对象之后，这个对象中默认会有一个不可访问的属性 [[prototype]] , 这个属性就指向了构造方法的原型对象。

		☞ 但是在个别浏览器中，也提供了对这个属性[[proto]]的访问(chrome浏览器和火狐浏览器。ie浏览器不支持)。访问方式：p1.__proto__

		☞ 但是开发者尽量不要用这种方式去访问，因为操作不慎会改变这个对象的继承原型链。

	-- hasOwnPrototype()方法

		☞ 我们都知道，要去访问一个对象的属性的时候，这个属性可能来自对象本身，也可能来自这个对象的[[proto]]属性指向的原型

		☞ hasOwnprotoype()方法，可以判断一个对象是否来自对象本身。
		  <script type="text/javascript">
				function Person () {
						
				}
				Person.prototype.name = "Jack";
				var p1 = new Person();
				p1.sex = "man";
				//sex属性是直接在p1属性中添加，所以是true
				alert("sex属性是对象本身的：" + p1.hasOwnProperty("sex"));
				// name属性是在原型中添加的，所以是false
				alert("name属性是对象本身的：" + p1.hasOwnProperty("name"));
				//  age 属性不存在，所以也是false
				alert("age属性是存在于对象本身：" + p1.hasOwnProperty("age"));
			</script>

		◆ 通过hasOwnProperty这个方法可以判断一个属性是否在对象本身添加的，但是不能判断是否存在于原型中，因为有可能这个属性不存在。

		◆ 也即是说，在原型中的属性和不存在的属性都会返回fasle。

		◆ 这个也是唯一的一个处理属性而不查找原型链的方法！
  
	-- in操作符
		☞ in操作符用来判断一个属性是否存在于这个对象中。但是在查找这个属性时候，先在对象本身中找，如果对象找不到再去原型中找。换句话说，只要对象和原型中有一个地方存在这个属性，就返回true
		  <script type="text/javascript">
				function Person () {
						
				}
				Person.prototype.name = "Jack";
				var p1 = new Person();
				p1.sex = "man";
				alert("sex" in p1);     // 对象本身添加的，所以true
				alert("name" in p1);    //原型中存在，所以true
				alert("age" in p1);     //对象和原型中都不存在，所以false	
			</script>
		◆ 如果一个属性存在，要么在对象本身中，要么在原型中。
		  <script type="text/javascript">
				function Person () {
				}
				Person.prototype.name = "Jack";
				var p1 = new Person();
				p1.sex = "man";
				
				//定义一个函数去判断原型所在的位置
				function propertyLocation(obj, prop){
						if(!(prop in obj)){
								alert(prop + "属性不存在");
						}else if(obj.hasOwnProperty(prop)){
								alert(prop + "属性存在于对象中");
						}else {
								alert(prop + "对象存在于原型中");
						}
				}
				propertyLocation(p1, "age");
				propertyLocation(p1, "name");
				propertyLocation(p1, "sex");
			</script>

	--  组合使用原型模型和构造函数模型创建对象
		-- 原型模型创建对象的缺陷
			☞ 原型中的属性是共享的。就是说，用同一个构造函数创建的对象去访问原型中的属性的时候，大家都是访问同一个对象，如果一个对象对原型的属性进行更改，则会		反映到所有对象上面。

			☞ 这个共享特性对方法(属性值是函数的属性)又是非常合适的。所有的对象共享方法是最佳状态。这种特性在c#和Java中是天生存在的。

	-- 使用构造函数模型创建对象的缺陷
		☞ 在构造函数中添加的属性和方法，每个对象都有自己独有的一份，大家不会共享。这个特性对属性比较合适，但是对方法又不太合适。因为对所有对象来说，他们的方法应该是一份就够了，没有必要每人一份，造成内存的浪费和性能的低下。

		  <script type="text/javascript">
				function Person() {
				   this.name = "Jack";
				   this.age = 20;
				   this.eat = function() {
				       alert("Eat food");
				   }
				}
				var p1 = new Person();
				var p2 = new Person();
				//每个对象都会有不同的方法
				alert(p1.eat === p2.eat); //fasle
			</script>
		可以使用下面的方法解决
		  <script type="text/javascript">
				function Person() {
				   this.name = "Jack";
				   this.age = 20;
				   this.eat = eat;
				}
				function eat() {
				   alert("Eat food");
				}
				var p1 = new Person();
				var p2 = new Person();
				//因为eat属性都是赋值的同一个函数，所以是true
				alert(p1.eat === p2.eat); //true
			</script>
		但是上面的这种解决方法有个致命的缺点：封装性太差。使用面向对象。目的之一就是封装代码，这个时候为了性能又要把代码抽出对象之外，这是反人类的设计。
	
	--  使用组合模式解决上述两种缺陷
		☞ 原型模式适合封装方法，构造方法模式适合封装属性，综合两种模式的优点就有了组合模式。
		  
		<script type="text/javascript">
	     //在构造方法内部封装属性
	     function Person(name, age) {
         this.name = name;
         this.age = age;
	     }
	     //在原型对象内封装方法
	     Person.prototype.eat = function (food) {
	         alert(this.name + "Eat" + food);
	     }
	     Person.prototype.play = function (playName) {
	         alert(this.name + "Play" + playName);
	     }
	     
	     var p1 = new Person("Jack", 20);
	     var p2 = new Person("Mark", 30);
	     p1.eat("apple");
	     p2.eat("orange");
	     p1.play("football");
	     p2.play("games");
		 </script>


	-- 动态原型模式创建对象
		☞ 前面讲到的组合模式，也并非完美无缺，有一点也是感觉不是很完美。把构造方法和原型分开写，总让人感觉不舒服，应该想办法把构造方法和原型封装在一起，所以就有了动态原型模式。

		☞ 动态原型模式把所有的属性和方法都封装在构造方法中，而仅仅在需要的时候才去在构造方法中初始化原型，又保持了同时使用构造函数和原型的优点。
		  
			<script type="text/javascript">
		     //构造方法内部封装属性
		     function Person(name, age) {
		         //每个对象都添加自己的属性
		         this.name = name;
		         this.age = age;
		         /*
		             判断this.eat这个属性是不是function，如果不是function则证明是第一次创建对象，
		             则把这个funcion添加到原型中。
		             如果是function，则代表原型中已经有了这个方法，则不需要再添加。
		             perfect！完美解决了性能和代码的封装问题。
		         */
		         if(typeof this.eat !== "function"){
		             Person.prototype.eat = function () {
		                 alert(this.name + " Eat good");
		             }
		         }
		     }
		     var p1 = new Person("Jack", 40);
		     p1.eat();   
			 </script>

		▸ 组合模式和动态原型模式是JavaScript中使用比较多的两种创建对象的方式。

		▸ 建议以后使用动态原型模式。他解决了组合模式的封装不彻底的缺点。

# JavaScript的继承
	-- 继承的概念

		☞ 继承是所有的面向对象的语言最重要的特征之一。大部分的oop语言的都支持两种继承：接口继承和实现继承。

		☞ 对JavaScript来说，没有类和接口的概念(ES6之前)，所以只支持实现继承，而且继承在 原型链 的基础上实现的。等了解过原型链的概念之后，你会发现继承其实是发生在对象与对象之间。这是与其他编程语言很大的不同。

	-- 原型连的概念
		在JavaScript中，将原型链作为实现继承的主要方法。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法

		☞ 再回顾下，构造函数、原型(对象)和对象之间的关系。每个构造函数都有一个属性 prototype 指向一个原型对象，每个原型对象也有一个属性 constructor 指向函数，通过new 构造函数() 创建出来的对象内部有一个不可见的属性[[prototype]]指向构造函数的原型。当每次访问对象的属性和方法的时候，总是先从p1中找，找不到则再去p1指向的原型中找。
		下面我们开始一步步的构造原型链，来实现继承

		1. 更换构造函数的原型
			☞ 原型其实就是一个对象，只是默认情况下原型对象是浏览器会自动帮我们创建的，而且自动让构造函数的 prototype 属性指向这个自动创建的原型对象。

			☞ 其实我们完全可以把原型对象更换成一个我们自定义类型的对象。
				<script type="text/javascript">
					//定义一个构造函数。
					function Father () {
						// 添加name属性.  默认直接赋值了。当然也可以通过构造函数传递过来
						this.name = "马云";
					}
					//给Father的原型添加giveMoney方法
					Father.prototype.giveMoney = function () {
						alert("我是Father原型中定义的方法");
					}
					//再定义一个构造函数。
					function Son () {
						//添加age属性
						this.age = 18;
					}
					//关键地方：把Son构造方法的原型替换成Father的对象。  因为原型是对象，任何对象都可以作为原型
					Son.prototype = new Father();
					//给Son的原型添加getMoney方法
					Son.prototype.getMoney = function () {
						alert("我是Son的原型中定义的方法");
					}
					//创建Son类型的对象
					var son1 = new Son();
			​
					//发现不仅可以访问Son中定义属性和Son原型中定义的方法，也可以访问Father中定义的属性和Father原型中的方法。
					//这样就通过原型完成了类型之间的继承。 
					// Son继承了Father中的属性和方法，当然还有Father原型中的属性和方法。
					son1.giveMoney();
					son1.getMoney();
					alert("Father定义的属性：" + son1.name);
					alert("Son中定义的属性：" + son1.age);	​
				</script>
				上面的代码完成了Son继承Father的过程。
		
		2. 默认顶端原型

		3. 测试数据类型
			☞ 到目前为止，我们共学了三种方法来测试数据类型。

			1) typeof ：一般用来测试简单数据类型和函数的类型。如果用来测试对象，则会一直返回object，没有太大意义。

			2) instanceof ：用来测试一个对象是不是属于某个类型。结果为boolean值。

			3) isPrototypeOf( 对象 ) ：这是个 原型对象 的方法，参数传入一个对象，判断参数对象是不是由这个原型派生出来的。 也就是判断这个原型是不是参数对象		 原型链中的一环。

		4. 原型链在继承中的缺陷

			☞ 原型链并非完美无缺，也是存在一些问题的。

			1) 父类型的属性共享问题

				☞ 在原型链中，父类型的构造函数创建的对象，会成为子类型的原型。那么父类型中定义的实例属性，就会成为子类型的原型属性。对子类型来说，这和我们以前说的在原型中定义方法，构造函数中定义属性是违背的。子类型原型(父类型对象)中的属性被所有的子类型的实例所共有，如果有个一个实例去更改，则会很快反应的其他的实例上。
					
				<script type="text/javascript">
						function Father () {
								this.girls = ["Andy", "Lucy"];
						}
						function Son () {
								
						}
						// 子类的原型对象中就有一个属性 girls ，是个数组
						Son.prototype = new Father();   
						var son1 = new Son();
						var son2 = new Son();
						//给son1的girls属性的数组添加一个元素
						son1.girls.push("Lily");
						//这时，发现son2中的girls属性的数组内容也发生了改变
						alert(son2.girls);  // "Andy", "Lucy", "Lily"
				</script>

			2) 向父类型的构造函数中传递参数问题

				☞ 在原型链的继承过程中，只有一个地方用到了父类型的构造函数，Son.prototype = new Father();。只能在这一个位置传递参数，但是这个时候传递的参数，将来对子类型的所有的实例都有效。

				☞ 如果想在创建子类型对象的时候传递参数是没有办法做到的。

				☞ 如果想创建子类对象的时候，传递参数，只能另辟他法

	-- 借用构造函数调用“继承”

		1. 借用方式
			借用构造函数调用 继承，又叫伪装调用继承或冒充调用继承。虽然有了继承两个字，但是这种方法从本质上并没实现继承，只是完成了构造方法的调用而已。

			☞ 使用 call 或 apply 这两个方法完成函数借调。这两个方法的功能是一样的，只有少许的区别(暂且不管)。功能都是更改一个构造方法内部的 this 指向到指定的对象上。
		  <script type="text/javascript">
				function Father (name,age) {
					this.name = name;
					this.age = age;
				}
				//如果这样直接调用，那么father中的this只的是 window。 因为其实这样调用的： window.father("李四", 20)
				// name 和age 属性就添加到了window属性上
				Father("Jack", 20);
				alert("name:" + window.name + "\nage:" + window.age);  //可以正确的输出
		​
				//使用call方法调用，则可以改变this的指向
				function Son (name, age, sex) {
					this.sex = sex;
	       //调用Father方法(看成普通方法)，第一个参数传入一个对象this，则this(Son类型的对象)就成为了Father中的this
					Father.call(this, name, age);
				}
				var son = new Son("Mark", 30, "man");
				alert("name:" + son.name + "\nage:" + son.age + "\nsex:" + son.sex);
				alert(son instanceof Father); //false
			</script>

			函数借调的方式还有别的实现方式，但是原理都是一样的。但是有一点要记住，这里其实并没有真的继承，仅仅是调用了Father构造函数而已。也就是说，son对象和Father没有任何的关系。
		2. 借用的缺陷
			☞ Father的原型对象中的共享属性和方法，Son没有办法获取。因为这个根本就不是真正的继承。
	
	-- 组合继承
		☞ 组合函数利用了原型继承和构造函数借调继承的优点，组合在一起。成为了使用最广泛的一种继承方式。
		  <script type="text/javascript">
				//定义父类型的构造函数
				function Father (name,age) {
						// 属性放在构造函数内部
						this.name = name;
						this.age = age;
						// 方法定义在原型中
						if((typeof Father.prototype.eat) != "function"){
								Father.prototype.eat = function () {
										alert(this.name + " Eat food");
								}
						}  
				}
				// 定义子类类型的构造函数
				function Son(name, age, sex){
		       //借调父类型的构造函数，相当于把父类型中的属性添加到了未来的子类型的对象中
						Father.call(this, name, age);
						this.sex = sex;
				}
				//修改子类型的原型为父类型的对象。这样就可以继承父类型中的方法了。
				Son.prototype = new Father( );
				var son1 = new Son("Jack", 30, "man");
				alert(son1.name);
				alert(son1.sex);
				alert(son1.age);
				son1.eat();
			</script>

		说明： 
			1) 组合继承是我们实际使用中最常用的一种继承方式。
			2) 可能有个地方有些人会有疑问：Son.prototype = new Father( );这不照样把父类型的属性给放在子类型的原型中了吗，还是会有共享问题呀。但是不要忘记了，我们在子类型的构造函数中借调了父类型的构造函数，也就是说，子类型的原型（也就是Father的对象）中有的属性，都会被子类对象中的属性给覆盖掉。就是这样的。

#	作用域链和闭包

	-- 匿名函数
	  1. 什么是匿名函数
			☞ 声明一个没有函数名的函数，就是匿名函数。
			☞ 有名函数就是具名函数。
				  
				<script type="text/javascript">
					/*
					//这里定义了一个函数，而且没有函数名。这样写语法是错误的,如果允许这样定义，那么根本就没有办法调用。
					//所以，我们可以用一个变量来存储一下
					function(){ 
			     
					}
					*/
					 // 声明了一个匿名函数，并把匿名函数赋值给变量f。 注意这个时候这个匿名函数并没有执行。
				 	var f = function(){
				   alert("哥们我是匿名函数内的代码");
					}
				 //我们可以把变量 f 当做一个函数名来调用
				 f();  //调用上面定义的匿名函数
				</script>
			
		2. 匿名函数应用场景

			1) 给标签绑定事件
				  
				<script type="text/javascript">
					var btn = document.getElementById("btn");
					btn.onclick = function () {
						alert("点我干吗");
					}
				</script>

			2) 在定时器中使用
				  
				<body>
					<h1></h1>
					<script type="text/javascript">
							var showTimeArar = document.getElementsByTagName("h1")[0];
							setInterval(function () {
								showTimeArar.innerHTML = new Date().toLocaleString();
							}, 1000);
					</script>
				</body>

			3) 给对象定义方法
				  
				<script type="text/javascript">
					var person = {
						name : "凤姐",
						age : 30,
						play : function () {
							alert(this.name + "在美国玩");
						}
					}
					person.play();
				</script>

		3. 匿名函数的自调用
			(function () {
				alert("匿名函数立即执行")   
			}());
	
			说明：
				1) 需要把匿名函数用一对圆括号括起来，把匿名函数作为一个整体来对待;
				2) 最后再添加一对圆括号表示调用函数。这样定义的匿名函数就会立即执行;
				3) 当然，这个时候即使给这个函数加上方法名，也可以调用。不过这种情况为什么还要加方法名呢?

	-- 变量的作用域
		变量的作用域指的是，变量起作用的范围。也就是能访问到变量的有效范围。
		JavaScript的变量依据作用域的范围可分为：
			➢ 全局变量
			➢ 局部变量
		
		1. 全局变量
			
			定义在函数外部的变量就是全局变量。
			全局变量的作用域是当前文档，也就是当前文档所有的JavaScript脚本都可以访问到这个变量。
		 
				<script type="text/javascript">
					//定义了一个全局变量。那么这个变量在当前html页面的任何的JS脚本部分都可以访问到。
					var v = 20; 
					alert(v); //弹出：20
				</script>
				<script type="text/javascript">
					//因为v是全局变量，所以这里仍然可以访问到。
					alert(v);  //弹出：20
				</script>

				  
				<script type="text/javascript">
					alert(a);//undefinde
					var a = 20;
				</script>

				☞ 为什么在声明 a 之前可以访问变量 a 呢? 能访问 a 为什么输出是undefined而不是20呢？

				声明提前！

				➢ 所有的全局变量的声明都会提前到JavaScript的前端声明。也就是所有的全局变量都是先声明的，并且早于其他一切代码。

				➢ 但是变量的赋值的位置并不会变，仍然在原位置赋值。
				  
				<script type="text/javascript">
					var a; //声明提前
					alert(a);
					a = 20; //赋值仍然在原来的位置
				</script>
		
		2. 局部变量
			在函数内声明的变量，叫局部变量！表示形参的变量也是局部变量！
			局部变量的作用域是局部变量所在的整个函数的内部。 在函数的外部不能访问局部变量。
			  
			<script type="text/javascript">
				function f(){
					alert(v);  //   弹出：undefined
					var v = "abc";  // 声明局部变量。局部变量也会声明提前到函数的最顶端。
					alert(v);   //  弹出：abc
				}
				alert(v);  //报错。因为变量v没有定义。 方法 f 的外部是不能访问方法内部的局部变量 v 的。
			</script>

		3. JavaScript中有没有块级作用域
			  
			<script type="text/javascript">
			 var m = 5;
			 if(m == 5){
			   var n = 10;
				}
			 alert(n); //代码1
			</script>
			代码1输出什么？undefined还是10？还是报错？
			输出10

			➢ JavaScript的作用域是按照函数来划分的
			➢ JavaScript没有块级作用域

		☞ 在上面的代码中，变量 n 虽然是在 if 语句内声明的，但是它仍然是全局变量，而不是局部变量。
		☞ 只有定义方法内部的变量才是局部变量
		注意：
			☞ 即使我们把变量的声明放在 if、for等块级语句内，也会进行声明提前的操作！
	
	-- 作用域链—作用域的深入理解
		1. 执行环境
			执行环境（ execution context ）是 JavaScript 中最为重要的一个概念。执行环境定义了变量或函数有权访问的其他数据，决定了它们各自的行为。每个执行环境都有一个与之关联的变量对象（variable object），环境中定义的所有变量和函数都保存在这个对象中。虽然我们编写的代码无法访问这个对象，但解析器在处理数据时会在后台使用它。

			全局执行环境是最外围的一个执行环境。在 Web 浏览器中，全局执行环境被认为是 window 对象，因此所有全局变量和函数都是作为 window 对象的属性和方法创建的。对全局执行环境变量来说，变量对象就是window对象，对函数来说，变量对象就是这个函数的活动对象（活动对象是在函数调用时创建的一个内部变量）

			每个函数都有自己的执行环境，当执行流进入一个函数时，函数的执行环境就会被推入一个执行环境栈中。而在函数执行之后，栈将执行结束的函数的执行环境弹出，把控制权返回给之前的执行环境。
		
		2. 作用域链
			作用域链与一个执行环境相关，作用域链用于在变量查找。

    	在JavaScript中，函数也是对象，实际上，JavaScript里一切都是对象。函数对象和其它对象一样，拥有可以通过代码访问的属性和一系列仅供JavaScript引擎访问的内部属性。其中一个内部属性是[[Scope]]，由ECMA-262标准第三版定义，他就指向了这个函数的作用域链。作用域链中存储的是与每个执行环境相关变量对象 (函数内部也是活动对象)。

			当创建一个函数( 声明一个函数 )后，那么会创建这个函数的作用域链。这个函数的作用域链在这个时候只包含一个变量对象(window)
		
			<script type="text/javascript">
				function sum(num1, num2){
					var sum = num1 + num2;
					return sum;
				}
			</script>

			说明：函数创建的时候，这个时候作用域链中只有一个变量对象 (window)；
			  
			<script type="text/javascript">
				function sum(num1, num2){     
					var sum = num1 + num2; 
					return sum;
				}
				var sum = sum(3, 4);
			</script>
			当调用 sum 函数时，会首先创建一个 “执行环境”，这个 执行环境 有自己的作用域链，这个作用域链初始化为 sum 函数的 [[scope]] 所包含的对象。然后创建
			一个与这个执行环境相关的 变量对象( 活动对象 ) ，这个 变量对象 中存储了在这个函数中定义的所有参数、变量和函数。把 变量对象 存储在作用域中的顶端。
			后在查找变量的时候，总是从作用域链条的顶端开始查找，一直到作用域链条的末端。

		  说明：
				1) 在sum中访问一个变量的时候，总是从作用域链的顶端开始查找，如果找到就得到结果，如果找到不到就一直查找，直到作用域链的末端。
				2) 因为在方法内存在变量和函数的声明提前现象，所以函数一旦执行函数的活动对象(变量对象)中总是保存了这个函数中声明的所有变量和函数。
				3) 如果在函数中又定义了一个内部函数(还没有执行)，则这个时候内部函数的作用域，是包含了外部函数的作用域。一旦内部函数开始执行则把自己的活动对象添		 加到了这个作用域的顶端。
				  <script type="text/javascript">
						function sum(num1, num2){
							var sum = num1 + num2;
							function inner (a) {
							}
							return sum;
						}
						var sum = sum(3, 4);
					</script>
	
	-- 闭包
		<script type="text/javascript">
			function createSumFunction(num1, num2){
				return function () {
					return num1 + num2;
				};
			}
			var sumFun = createSumFunction(3, 4);
			var sum = sumFun();
			alert(sum);//7
		</script>

		在上面的代码中，createSumFunction函数返回了一个匿名函数，而这个匿名函数使用了createSumFunction函数中的局部变量(参数)，即使createSumFunction这个
		函数执行结束了，由于作用域链的存在，他的局部变量在匿名函数中仍然可以使用，这个匿名函数就是闭包

		##### 闭包是指有权访问另一个函数作用域中的变量的函数。
		  闭包是一种特殊的对象。它由两部分构成： 函数，以及创建该函数的环境 。环境由闭包创建时在作用域中的任何局部变量组成。在我们的例子中，sumFun 是一个
		  闭包，由匿名函数和闭包创建时存在的num1和num2两个局部变量组成。

	-- 闭包的应用

		1. 返回外部函数的局部变量

		<script type="text/javascript">
			function outer () {
				var num = 5;
				//定义一个内部函数
				function inner () {
				//内部函数的返回值是外部函数的一个局部变量
					return num;
				}
				//把局部变量的值++
				num++;
				// 返回内部函数
				return inner;
			}
			var num = outer()();  // 6
			alert(num);  
		</script>

		说明：
			1) 这例子中，虽然函数的声明在num++之前，但是函数返回的时候num已经++过了，所以只是num自增之后的值。
			2) 结论：闭包中使用的局部变量的值，一定是局部变量的最后的值。
	
		2. 使用函数自执行和闭包封装对象

			封装一个能够增删改查的对象		  
				<script type="text/javascript">
					var person = (function () {
						//声明一个对象，增删改查均是针对这个对象
						var personInfo = {
							name : "李四",
							age : 20
						};
						//返回一个对象，这个对象中封装了一些对personInfo操作的方法
						return {
							//根据给定的属性获取这个属性的值
							getInfo : function (property) {
								return personInfo[property];
							},
							//修改一个属性值
							modifyInfo : function (property, newValue) {
								personInfo[property] = newValue;		
							},
							//添加新的属性
							addInfo : function (property, value) {
								personInfo[property] = value;		
							},
							//删除指定的属性
							delInfo : function (property) {
								delete personInfo[property];
							}
						}
					})();
					alert(person.getInfo("name"));
					person.addInfo("sex", "男");
					alert(person.getInfo("sex"));
				</script>
		
		3. for循环典型问题
	  
			<body>
				<input type="button" value="按钮1" />
				<input type="button" value="按钮2" />
				<input type="button" value="按钮3" />
				<script type="text/javascript">
					var btns = document.getElementsByTagName("input");
					for (var i = 0; i < 3; i++) {
						btns[i].onclick = function () {
							alert("我是第" + (i + 1) + "个按钮");
						};
					}
				</script>
			</body> 

			发现在点击三个按钮的时候都是弹出 我是第4个按钮。 为什么呢？闭包导致的！ 每循环一次都会有一个匿名函数设置点击事件，闭包总是保持的变量的最后一个值,
			所以点击的时候，总是读的是 i 的组后一个值4.

			解决方案1：给每个按钮添加一个属性，来保存 每次 i 的临时值
  
			<body>
				<input type="button" value="按钮1"    >
				<input type="button" value="按钮2"    >
				<input type="button" value="按钮3"    >
				<script type="text/javascript">
					var btns = document.getElementsByTagName("input");
					for (var i = 0; i < 3; i++) {
						//把i的值绑定到按钮的一个属性上，那么以后i的值就和index的值没有关系了。
						btns[i].index = i;
						btns[i].onclick = function () {
							alert("我是第" + (this.index + 1) + "个按钮");
						};
					}
				</script>
			</body>

			解决方案2：使用匿名函数的自执行
  
			<body>
				<input type="button" value="按钮1"    >
				<input type="button" value="按钮2"    >
				<input type="button" value="按钮3"    >
				<script type="text/javascript">
					var btns = document.getElementsByTagName("input");
					for (var i = 0; i < 3; i++) {   
						//因为匿名函数已经执行了，所以会把 i 的值传入到num中，注意是i的值，所以num
						(function (num) {
							btns[i].onclick = function () {
								alert("我是第" + (num + 1) + "个按钮");
							}
						})(i);
					}
				</script>
			</body>

# this使用总结

	-- this使用总结
		  
		<script>
		  /*
		   * 默认绑定：
		   *   当直接调用一个函数的时候，就是默认绑定
		   *       1、非严格模式下，默认绑定到window上
		   *
		   * 隐式绑定：
		   *   当使用对象.方法() 这种方式调用，称之为隐式绑定
		   *   this绑定到前面的那个对象上
		   *
		   * new 绑定：
		   *   使用new来调用构造函数的方式
		   *   this是绑定在新创建的那个对象上
		   *
		   * 显示绑定：
		   *   call，apply：
		   *       都是一锤子买卖，仅仅这一次调用的时候使用了显示绑定，对原函数没有如何的影响
		   *
		   *       call和apply的区别：就是参数的传递方式
		   *           call：一个一个的传递
		   *           apply：把要传递的参数封装到一个数组中去传递
		   *
		   *   bind：固定绑定   es6新增
		   *       调用函数对象的bind方法，返回一个固定this绑定的新的函数
		   *       对原来的函数没有影响
		   *
		   *
		   *
		   *   优先级：bind > call,apply > new > 隐式
		   */
		​
		​
		  //1、默认绑定
		  function  foo() {
		      console.log(this);//this指 obj   谁调用指向谁
		  }
		​
		​
		  //2、隐式绑定
		  var name = "Mark";
		  var obj = {
		      name : "Jack",
		      foo : foo,
		      foo1 : function () {
		          console.log(this.name);//this指 window
		      }
		  }
		  obj.foo();//{name: "Jack", foo: function, foo1: function}
		  var foo1 = obj.foo1;
		  foo1();//Mark
		​
		​
		  //3、new 绑定
		  function  foo2() {
		      this.name = "Lucy";
		      console.log(this);//this 指向foo2    foo2 {name: "Lucy"}
		  }
		  var obj2 = new foo2();
		  console.log(obj2);//this 指向foo2        foo2 {name: "Lucy"}
		​
		   var foo3 = obj.foo1;
		   foo3();//Mark
		​
		   var obj3 = new foo;//foo {}
		   console.log(obj3);//foo {}
		​
		​
		  //4、显示绑定
		​
		  //call  apply
		   function  foo4(a,b) {
		       console.log(this.name,a,b);
		   }
		   foo4.call({name:"Jack"},10,20)//Jack 10 20
		   foo4.apply({name:"Mark"},[20,10])//Mark 20 10
		​
		   //apply求max
		   var arr = [23,65,2,45,3,57,4567];
		   console.log(Math.max.apply(Math,arr)); //max = 4567
		​
		   //定义Math 求和的方法
		   Math.sun = function () {
		       return Array.prototype.reduce.call(arguments,function (sun,ele) {
		           return sun + ele;
		       },0)
		   }
		   console.log(Math.sun.apply(Math,arr));//sum = 4762
		​
		   //bind
		   var obj4 = {
		       name : "Jack"
		   }
		   function  foo5() {
		       console.log(this.name);
		   }
		   var f = foo5.bind(obj4);//这种绑定方式优先级最高
		   f();//Jack
		​
		   var obj5 = {
		       name : "Mark",
		       foo6 : f
		   }
		   obj5.foo6()//Jack
		</script>
	
	-- 绑定的丢失问题
		  <script>
		  /*
		   * 回调函数的this绑定丢失问题:this会绑定到window
		   *
		   *   定时器
		   *
		   *
		   * 显示绑定丢失问题
		   *   显示绑定传入null、undefined时，this就成了默认绑定
		   *
		   */
		​
		  //定时器绑定丢失
		  var name = "Jack";
		  var obj = {
		      name : "Mark",
		      show : function () {
		          setInterval(function () {
		              console.log(this.name);// 此时this指向window
		          },1000)
		      }
		  }
		  obj.show();//Jack++
		​
		  //解决方法一
		  var obj1 = {
		      name : "Mark",
		      show : function () {
		          var self = this;
		          setInterval(function () {
		              console.log(self.name);// 此时this指向obj1
		          },1000)
		      }
		  }
		  obj1.show();//Mark++
		​
		  //解决方法二
		  var obj2 = {
		      name : "Joe",
		      show : function () {
		          setInterval(function () {
		              console.log(this.name);// 此时this指向obj2
		          }.bind(this),1000)
		      }
		  }
		  obj2.show();//Mark++
		​
		   //显示绑定丢失
		   function foo() {
		      console.log(this.name);
		   }
		   var f = foo.bind(undefined);// 此时this指向window
		   f();//Jack
		</script>
