(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{156:function(e,t,a){e.exports=a(335)},161:function(e,t,a){},163:function(e,t,a){},211:function(e,t,a){},238:function(e,t){},240:function(e,t){},276:function(e,t){},277:function(e,t){},335:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(20),c=a.n(l),u=(a(161),a(8)),o=a.n(u),s=a(13),i=a(21),m=a(22),p=a(23),f=a(24),h=a(33),d=(a(163),a(340)),g=a(12),E=a(35),v=(a(211),function(e){var t=null;return e.authState.isLogin&&e.authState.user&&(t=r.a.createElement(g.b,{to:"/users/".concat(e.authState.user.userName)},e.user.name)),r.a.createElement("div",{style:{height:"350px",position:"relative"}},r.a.createElement(E.Layout,{style:{background:"url(https://images.unsplash.com/photo-1499551660540-eaf0697882f5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2551&q=80) center / cover"}},r.a.createElement(E.Header,{transparent:!0,title:"LUDUS"},r.a.createElement(E.Navigation,null,r.a.createElement(g.b,{className:"a",to:"/gameSearch"},"Search for Games!"),r.a.createElement(g.b,{className:"a",to:"/userSearch"},"Search for Friends!"),t)),r.a.createElement(E.Drawer,{title:"Join Us!"},r.a.createElement(E.Navigation,null,e.authState.isLogin?r.a.createElement(d.a,{as:g.b,to:"/login",variant:"outline-dark",onClick:e.logout}," ","Logout"," "):r.a.createElement(r.a.Fragment,null," ",r.a.createElement(d.a,{as:g.b,to:"/login",variant:"outline-dark"},"Login"," "),r.a.createElement(d.a,{as:g.b,to:"/Register",variant:"outline-dark"}," ","Register"," ")," "))),r.a.createElement(E.Content,null)))}),b=a(40),y=a(29),k=a(60),S=a(336),L=a(338),x=a(11),C=a.n(x),j=function(e){var t=Object(n.useState)({}),a=Object(k.a)(t,2),l=a[0],c=a[1],u=function(e){var t=e.target,a=t.name,n=t.value;c(Object(y.a)({},l,Object(b.a)({},a,n)))};Object(n.useEffect)((function(){}));var i=function(){var t=Object(s.a)(o.a.mark((function t(a){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),t.prev=1,t.next=4,C.a.post("/user/login",l);case 4:n=t.sent,e.userLogin(n.data.token),t.next=10;break;case 8:t.prev=8,t.t0=t.catch(1);case 10:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(S.a,null,r.a.createElement("h1",null,"Login Page"),r.a.createElement("h3",null,"Hey do a form here"),r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"Email"),r.a.createElement(L.a.Control,{name:"email",onChange:function(e){return u(e)}})),r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"Password"),r.a.createElement(L.a.Control,{name:"password",type:"password",onChange:function(e){return u(e)}})),r.a.createElement(d.a,{variant:"primary",type:"submit",onClick:function(e){i(e)}},"Sign in!")))},w=function(e){var t=Object(n.useState)({}),a=Object(k.a)(t,2),l=a[0],c=a[1];Object(n.useEffect)((function(){}));var u=function(e){var t=e.target,a=t.name,n=t.value;c(Object(y.a)({},l,Object(b.a)({},a,n)))},i=function(){var t=Object(s.a)(o.a.mark((function t(a){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),t.prev=1,t.next=4,C.a.post("/user/register",l);case 4:n=t.sent,e.userLogin(n.data.token),t.next=10;break;case 8:t.prev=8,t.t0=t.catch(1);case 10:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement(S.a,null,r.a.createElement("h1",null,"Register page"),r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"Name"),r.a.createElement(L.a.Control,{name:"name",onChange:function(e){return u(e)}})),r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"Username"),r.a.createElement(L.a.Control,{name:"userName",onChange:function(e){return u(e)}})),r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"Email"),r.a.createElement(L.a.Control,{name:"email",onChange:function(e){return u(e)}})),r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"Password"),r.a.createElement(L.a.Control,{name:"password",type:"password",onChange:function(e){return u(e)}})),r.a.createElement(g.b,{to:"/login"},r.a.createElement(d.a,{variant:"primary",type:"submit",onClick:function(e){return i(e)}},"Register"))))},O=(a(231),a(232),a(337)),I=a(154),N=a(339);function F(e){var t=e.game,a=t.id,n=t.name,l=t.cover,c=t.first_release_date,u="";if(l){var o=l.image_id;u="https://images.igdb.com/igdb/image/upload/t_".concat("720p","/").concat(o,".jpg")}return r.a.createElement(I.a,{md:3,className:"m-1"},r.a.createElement(N.a,null,r.a.createElement(N.a.Img,{style:{height:"100%",width:"100%"},variant:"top",src:u}),r.a.createElement(N.a.Body,null,r.a.createElement(N.a.Title,{className:"text-center"},r.a.createElement(g.b,{className:"a",to:"/gamePage/".concat(a)},n)),r.a.createElement(N.a.Text,{className:"text-center"},"(",new Date(1e3*c).getFullYear(),")"))))}var G=function(e){Object(f.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={results:[]},e.changeHandler=function(t){var a=Object(y.a)({},e.state);a[t.target.name]=t.target.value,e.setState(a)},e.searchHandler=function(){e.getGames(e.state.searchTerm)},e}return Object(m.a)(a,[{key:"getGames",value:function(){var e=Object(s.a)(o.a.mark((function e(t){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.a.get("/game/search/".concat(t));case 3:a=e.sent,this.setState({results:a.data}),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state.results;return r.a.createElement("div",null,r.a.createElement(S.a,null,r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"Search Games"),r.a.createElement(L.a.Control,{name:"searchTerm",onChange:this.changeHandler}),r.a.createElement("button",{onClick:this.searchHandler},"Search"))),r.a.createElement(O.a,null,e.map((function(e,t){return r.a.createElement(F,{key:t,game:e})}))))}}]),a}(n.Component);function T(e){var t=e.user,a=t.userName,n=t.name;t.profilePic;return r.a.createElement(I.a,{md:3,className:"m-2"},r.a.createElement(N.a,null,r.a.createElement(N.a.Body,null,r.a.createElement(N.a.Title,{className:"text-center"},r.a.createElement(g.b,{className:"a",to:"/users/".concat(a)},n)))))}var D=function(e){Object(f.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={results:[]},e.changeHandler=function(t){var a=Object(y.a)({},e.state);a[t.target.name]=t.target.value,e.setState(a)},e.searchHandler=function(){e.getUsers(e.state.searchTerm)},e}return Object(m.a)(a,[{key:"getUsers",value:function(){var e=Object(s.a)(o.a.mark((function e(t){var a=this;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:C.a.put("/user/search",{searchTerm:t}).then((function(e){a.setState({results:e.data.users})})).catch((function(e){}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(S.a,null,r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"Search Users"),r.a.createElement(L.a.Control,{name:"searchTerm",onChange:this.changeHandler}),r.a.createElement("button",{onClick:this.searchHandler},"Search"))),r.a.createElement(O.a,null,this.state.results.map((function(e,t){return r.a.createElement(T,{key:t,user:e})}))))}}]),a}(n.Component),U=function(e){Object(f.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={game:{},isLoaded:!1},e}return Object(m.a)(a,[{key:"getGameInfo",value:function(){var e=Object(s.a)(o.a.mark((function e(t){var a;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.a.get("/game/getGameInfo/".concat(t));case 3:a=e.sent,this.setState({game:a.data,isLoaded:!0}),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,this,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()},{key:"componentWillMount",value:function(){this.getGameInfo(this.props.match.params.gameID)}},{key:"render",value:function(){var e=this.state,t=e.isLoaded,a=e.game,n=a.cover,l=a.franchise,c=a.name,u=a.game_modes,o=a.genres,s=a.involved_companies,i=a.platforms,m=a.first_release_date,p=a.summary,f="";if(n){var h=n.image_id;f="https://images.igdb.com/igdb/image/upload/t_".concat("720p","/").concat(h,".jpg")}var d=null,g=null,E=null,v=null,b=null,y=null;return l&&(d=l?r.a.createElement(N.a.Text,null,r.a.createElement("span",{style:{fontWeight:"bold"}},"Franchise: ")," ",l.name):null),"undefined"!==typeof u&&(g=u.length>0?r.a.createElement(N.a.Text,null," ",r.a.createElement("span",{style:{fontWeight:"bold"}}," Game Modes: "),u.map((function(e,t){return e.name+" "}))):null),"undefined"!==typeof o&&(E=o.length>0?r.a.createElement(N.a.Text,null," ",r.a.createElement("span",{style:{fontWeight:"bold"}},"Genres: "),o.map((function(e,t){return e.name+" "}))):null),"undefined"!==typeof s&&(b=s.length>0?r.a.createElement(N.a.Text,null," ",r.a.createElement("span",{style:{fontWeight:"bold"}},"Developers: "),s.map((function(e,t){if(e.developer)return e.company.name+" "}))):null,v=s.length>0?r.a.createElement(N.a.Text,null," ",r.a.createElement("span",{style:{fontWeight:"bold"}},"Publishers: "),s.map((function(e,t){if(e.publisher)return e.company.name+" "}))):null),"undefined"!==typeof platfroms&&(y=i.length>0?r.a.createElement(N.a.Text,null," ",r.a.createElement("span",{style:{fontWeight:"bold"}},"Platforms: "),i.map((function(e,t){return e.name+" "}))):null),r.a.createElement(I.a,{md:3,className:"m-1"},t?r.a.createElement(N.a,null,r.a.createElement(N.a.Img,{style:{height:"100%",width:"100%"},variant:"top",src:f}),r.a.createElement(N.a.Body,null,r.a.createElement(N.a.Title,{className:"text-center",style:{fontWeight:"bold",fontSize:"24px"}},c),r.a.createElement(N.a.Text,{className:"text-center",style:{fontWeight:"bold",fontSize:"20px"}},"(",new Date(1e3*m).getFullYear(),")"),d,g,E,y,b,v,p?r.a.createElement(N.a.Text,null,r.a.createElement("span",{style:{fontWeight:"bold"}},"Description: ")," ",p):null)):null)}}]),a}(n.Component),P=function(e){Object(f.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={user:{FriendsList:[]},authState:e.props.authState,isLoaded:!1},e.getUserInfo=function(){var t=Object(s.a)(o.a.mark((function t(a){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.props.getUserInfo(a);case 3:(n=t.sent)?e.setState({user:n,isLoaded:!0}):e.setState({user:{FriendsList:[]},isLoaded:!1}),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}(),e.sendFriendRequest=function(e){C.a.put("/user/addFriend",{recieverId:e},{headers:{"x-auth-token":localStorage.token}}).then((function(e){})).catch((function(e){}))},e.acceptFriendRequest=function(e){C.a.put("/user/acceptFriend",{senderID:e},{headers:{"x-auth-token":localStorage.token}}).then((function(e){})).catch((function(e){}))},e.removeFriend=function(e){C.a.put("/user/removeFriend",{friendID:e},{headers:{"x-auth-token":localStorage.token}}).then((function(e){})).catch((function(e){}))},e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){this.getUserInfo(this.props.match.params.userName)}},{key:"render",value:function(){var e=this,t=this.state,a=t.user,n=t.isLoaded,l=a._id,c=a.name,u=a.userName,o=a.email,s=a.profilePic,i=a.FriendsList,m=a.nationality,p=a.aboutMe,f=a.languages,h=null;return n&&i.length>0&&(h=i.map((function(t,a){return r.a.createElement(r.a.Fragment,null,r.a.createElement(N.a.Text,{key:a},t.friendID.name),e.props.authState.isLogin&&l===e.props.authState.user._id?r.a.createElement(r.a.Fragment,null,t.isAccepted?r.a.createElement(d.a,{onClick:function(){return e.removeFriend(t.friendID._id)},variant:"outline-dark"}," ","Remove Friend"):r.a.createElement(r.a.Fragment,null," ","sender"==t.role?r.a.createElement(r.a.Fragment,null,r.a.createElement(d.a,{onClick:function(){return e.acceptFriendRequest(t.friendID._id)},variant:"outline-dark"}," ","Accept Request"," "),r.a.createElement(d.a,{onClick:function(){return e.removeFriend(t.friendID._id)},variant:"outline-dark"}," ","Reject Request")):r.a.createElement(d.a,{onClick:function(){return e.removeFriend(t.friendID._id)},variant:"outline-dark"}," ","Cancel Request")," ")):null)}))),r.a.createElement(I.a,{md:3,className:"m-1"},n?r.a.createElement(N.a,null,r.a.createElement(N.a.Img,{style:{height:"100%",width:"100%"},variant:"top",src:s}),r.a.createElement(N.a.Body,null,this.props.authState.isLogin&&l!==this.props.authState.user._id?r.a.createElement(d.a,{variant:"outline-dark",onClick:function(){return e.sendFriendRequest(l)}}," ","Add Friend"," "):null," ",this.props.authState.isLogin&&l===this.props.authState.user._id?r.a.createElement(d.a,{as:g.b,to:{pathname:"/EditProfile/".concat(u),user:this.state.user},variant:"outline-dark"}," ","Edit"," "):null," ",r.a.createElement(N.a.Title,{className:"text-center"},"Name: ",c),r.a.createElement(N.a.Text,null,"Username: ",u),r.a.createElement(N.a.Text,null,"Email: ",o),r.a.createElement(N.a.Text,null,"Nationality: ",m),r.a.createElement(N.a.Text,null,"Languages: ",f),r.a.createElement(N.a.Text,null,"About me: ",p),"Friends List:",h)):null)}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.authState!=t.authState?{authState:e.authState}:null}}]),a}(n.Component),_=function(e){Object(f.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={user:{},isLoaded:!1,edit:{password:""}},e.onChangeInput=function(t){var a=Object(y.a)({},e.state);a.edit[t.target.name]=t.target.value,e.setState(a)},e.getUserInfo=function(){var t=Object(s.a)(o.a.mark((function t(a){var n;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.props.getUserInfo(a);case 3:(n=t.sent)?e.setState({user:n,isLoaded:!0}):e.setState({user:{},isLoaded:!1}),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(0);case 9:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(e){return t.apply(this,arguments)}}(),e.onSubmit=function(t){t.preventDefault(),C.a.put("/user/updateUser",e.state.edit,{headers:{"x-auth-token":localStorage.token}}).then((function(e){})).catch((function(e){}))},e}return Object(m.a)(a,[{key:"componentWillMount",value:function(){this.getUserInfo(this.props.match.params.userName)}},{key:"render",value:function(){var e=this,t=this.state,a=t.user,n=t.isLoaded,l=(a._id,a.name),c=a.userName,u=a.email,o=(a.profilePic,a.FriendsList,a.nationality),s=a.aboutMe,i=a.languages;return r.a.createElement("div",null,n?r.a.createElement(S.a,null,r.a.createElement("h1",null,"Edit"),r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"Name:"),r.a.createElement(L.a.Control,{defaultValue:l,name:"name",onChange:function(t){return e.onChangeInput(t)}})),r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"Username:"),r.a.createElement(L.a.Control,{defaultValue:c,name:"userName",onChange:function(t){return e.onChangeInput(t)}})),r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"Email:"),r.a.createElement(L.a.Control,{defaultValue:u,name:"email",onChange:function(t){return e.onChangeInput(t)}})),r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"Password:"),r.a.createElement(L.a.Control,{name:"password",type:"password",defaultValue:"",onChange:function(t){return e.onChangeInput(t)}})),r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"Nationality:"),r.a.createElement(L.a.Control,{defaultValue:o,name:"nationality",onChange:function(t){return e.onChangeInput(t)}})),r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"About me:"),r.a.createElement(L.a.Control,{defaultValue:s,name:"aboutMe",onChange:function(t){return e.onChangeInput(t)}})),r.a.createElement(L.a.Group,null,r.a.createElement(L.a.Label,null,"Languages:"),r.a.createElement(L.a.Control,{defaultValue:i,name:"languages",onChange:function(t){return e.onChangeInput(t)}})),r.a.createElement(d.a,{variant:"primary",type:"submit",onClick:function(t){return e.onSubmit(t)}},"Save")):null)}}]),a}(n.Component),H=a(155),W=function(e){Object(f.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(i.a)(this,a);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=t.call.apply(t,[this].concat(r))).state={user:null,isLogin:!1},e.loginHandler=function(t){e.userLogin(t)},e.userLogin=function(){var t=Object(s.a)(o.a.mark((function t(a){var n,r;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(localStorage.setItem("token",a),!(n=Object(H.decode)(a))){t.next=15;break}return t.prev=3,t.next=6,e.getUserInfo(n.userName);case 6:r=t.sent,e.setState({user:r,isLogin:!0}),t.next=13;break;case 10:t.prev=10,t.t0=t.catch(3),e.setState({user:null,isLogin:!1});case 13:t.next=16;break;case 15:localStorage.removeItem("token");case 16:case"end":return t.stop()}}),t,null,[[3,10]])})));return function(e){return t.apply(this,arguments)}}(),e.logoutHandler=function(t){t.preventDefault(),localStorage.removeItem("token"),e.setState({user:null,isLogin:!1})},e.refreshPage=function(){e.forceUpdate(),window.location.reload(!1)},e}return Object(m.a)(a,[{key:"componentDidMount",value:function(){localStorage.token&&this.userLogin(localStorage.token)}},{key:"getUserInfo",value:function(){var e=Object(s.a)(o.a.mark((function e(t){var a,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,C.a.get("/user/showProfile/".concat(t));case 3:return a=e.sent,e.next=6,a.data.user;case 6:return n=e.sent,e.abrupt("return",n);case 10:return e.prev=10,e.t0=e.catch(0),e.abrupt("return",null);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state,a=t.user,n=t.isLogin;return r.a.createElement("div",null,r.a.createElement(v,{authState:this.state,isLogin:n,userLogin:this.userLogin,user:a,logout:this.logoutHandler}),r.a.createElement(h.c,null,r.a.createElement(h.a,{path:"/login",render:function(){return r.a.createElement(j,{userLogin:e.loginHandler,refreshPage:e.refreshPage})}}),r.a.createElement(h.a,{path:"/register",render:function(){return r.a.createElement(w,{userLogin:e.userLogin,refreshPage:e.refreshPage})}}),r.a.createElement(h.a,{path:"/gameSearch",component:G}),r.a.createElement(h.a,{path:"/gamePage/:gameID",component:U}),r.a.createElement(h.a,{path:"/userSearch",component:D}),r.a.createElement(h.a,{path:"/users/:userName",render:function(t){return r.a.createElement(P,Object.assign({authState:e.state,getUserInfo:e.getUserInfo},t))}}),r.a.createElement(h.a,{path:"/EditProfile/:userName",render:function(t){return n&&t.match.params.userName===a.userName?r.a.createElement(_,Object.assign({getUserInfo:e.getUserInfo},t)):r.a.createElement(j,null)}})))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(333),a(334);c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(g.a,null,r.a.createElement(W,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[156,1,2]]]);
//# sourceMappingURL=main.65c53da2.chunk.js.map