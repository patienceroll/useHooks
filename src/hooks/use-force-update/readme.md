# 刷新当前 React 组件

&emsp;&emsp;如果一个 React 组件里面有很多数据变化频繁,我只需要同步数据,且并不需要组件更新,只有在适时想更新组件的时候更新。那么可以采用这个思路来实现组件功能:专门用一个状态来更新组件,数据同步只改变组件内部的值,但这个值不是状态,不会引起组件重新渲染。

&emsp;&emsp;我在这种场景下经常使用此种方式来实现 React 组件和功能：

&emsp;&emsp;一个组件内部有大量的输入类组件,且我需要获取这些输入类的组件的值然后提交。如果通过让输入类组件受控来实现的话，就是很不明智的,一来状态可能很多,二来状态变化,会导致其他不相关的输入组件重新渲染,恰好遇到不相关组件需要大量计算渲染的话,开销就很大导致性能低下; 如果我通过给输入类组件初始值,然后提交的时候通过获取输入类组件初始值来提交,这样会导致有太多输入类组件的实例,且我不止在提交的时候需要用到实例获取数据的话,可能会做很多相同的操作,导致代码重复度过高,也不是太好。所以我会采用这个 hooks 来实现这种功能来优化组件性能。

#### &emsp;&emsp;这个 hooks 没有太大的业务上的意义，只是我实现某些特定情况下的 React 组件的思路,当着这样做可以让每个组件都只有一个 forceUpdate 函数，看起来是没有无意义的代码了，也算是有用吧。