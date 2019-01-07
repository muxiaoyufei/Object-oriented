# 面向对象
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
  
  https://www.cnblogs.com/chiangchou/p/js-oop1.html
  http://www.cnblogs.com/chiangchou/p/js-oop2.html
  http://www.cnblogs.com/chiangchou/p/js-oop3.html

# 面向对象与面向过程的区别
 
   -- 面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候一个一个依次调用就可以了。

   -- 面向对象是把构成问题事务分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描述某个事物在整个解决问题的步骤中的行为。

# 面向对象的特征
    --  封装、 继承、 多态
