/*
 * myQuery library
 * Version 1.3.1
 * Copyright 2014 Marek Gogol
 * myQuery.marekgogol.sk
 */
(function(){
    var myQuery = function(selector){
        return new myQuery.fn.core(selector);
    };

    //Funkcie
    myQuery.fn = myQuery.prototype = {
        length : 0,
        each: function(callback){
            return myQuery.each(this, callback);
        },
        attr : function(name, value){
            if (!name)
                return;

            if (!value && !this[0])
                return '';

            if (typeof value=='string' || typeof value=='number' || value===false)
                return this.each(function(){
                    if (value===false)
                        this[0].removeAttribute(name);
                    else
                        this[0].setAttribute(name, value);
                });
            else return this[0].getAttribute(name);
        },
        //zavislost: css, animate, fade, slideUp, slideDown, slideToggle
        prop : function(prop, name){
            var name = name||myQuery.core.selector;
            if (typeof prop=='string' && this[0])
                return (typeof this[0][name]=='object') ? this[0][name][prop] : undefined;
            return this.each(function(){
                if (typeof this[0][name]!='object')
                    this[0][name] = {};

                for (var key in prop){
                    this[0][name][key] = prop[key];
                }
            });
        },
        find : function(selector){
            if (!selector)
                return this;

            var nodes = [],
                n = 0;
            this.each(function(){
                var result = myQuery.selector(selector, this[0]);

                for (var i = 0;i<result.length;i++,n++){
                    nodes[n] = result[i];
                }
            });
            return nodes.length ? myQuery(nodes) : myQuery();
        },
        not : function(selector){
            var elements = [];
            this.each(function(){
                if (selector[0]=='.')
                    if (this.hasClass(selector.substr(1, selector.length)))
                        return false;
                if (selector[0]=='#')
                    if (this.hasId(selector.substr(1, selector.length)))
                        return false;

                if (this.isElement(selector))
                    return false;
                elements.push(this[0]);
            });
            return myQuery(elements);
        },
        //zavislosti: pos
        parent : function(multiple){
            if (!this[0]) return this;
            if (multiple==true){
                var nodes = [];
                this.each(function(){
                    nodes.push(this[0].parentNode);
                });
            }
            return myQuery(multiple==true ? nodes : this[0].parentNode);
        },
        //zavislosti: append, prepend, pos
        child: function(index){
            if (!this[0]) return this;
            if (index!==true)
                var childs = myQuery.core.sibling(this[0].firstChild);
            if (!childs[0])
                return myQuery();
            if (typeof index!='number' && index!='last')
                if (index===true){
                    var nodes = [];
                    this.each(function(){
                        var childs = myQuery.core.sibling( this[0].firstChild );
                        for (var i = 0;i<childs.length;i++){
                            nodes.push(childs[i]);
                        }
                    });
                    return myQuery(nodes);
                } else
                    return myQuery(childs);
            else {
                return myQuery(childs).eq(index);
            }
        },
        eq : function(i){
            if (i==-1)
                var i = this.length;
            else if (i==0)
                var i = 1;
            return myQuery(this[i-1]);
        },
        //zavislosti: child, pos, first, last
        index : function(selector){
            if (!this[0])
                return this;

            var parent = myQuery.core.sibling(this[0].parentNode.firstChild),
                index = selector==-1 ? parent.length : (typeof selector==='number') ? (selector==0 ? 1 : selector) : false;

            if (index>parent.length)
                return myQuery();

            if (myQuery.is.numeric(index)){
                var element = myQuery(parent[index-1]);
            } else {
                for (var i=0;i<parent.length;i++){
                    if (parent[i]==this[0]){
                        var element = i+1;
                        break;
                    }
                }
            }
            if (!element)
                return myQuery();
            return element;
        },
        //zavislosti : next, prev
        pos : function(p, func){
            var parent = this.parent().child(),
                index = this.index(),
                p = p||0;
            return this.index(index+p);
        },
        first : function(){
            return this.index(0);
        },
        last : function(){
            return this.index(-1);
        },
        next : function(p){
            return this.pos(p||1, 'next');
        },
        prev : function(p){
            return this.pos(p||-1, 'prev');
        },
        remove : function(){
            var o = this;
            o.each(function(i){
                o[i].parentNode.removeChild(o[i]);
            });
            o.length = 0;
            return o;
        },
        //zavislosti: on
        inParent : function(selector, node){
            var node = node ? myQuery(node) : this;

            if (node.length==0 || node[0]==document)
                return myQuery();

            if (selector.indexOf('.')>-1){
                var classname = selector.split('.')[1];
                if (node.hasClass(classname))
                    return myQuery(node);
                else if (node[0].parentNode)
                    return myQuery.fn.inParent(selector, node[0].parentNode);
            } else if (selector.indexOf('#')>-1){
                var id = selector.split('#')[1];
                if (node.hasId(id))
                    return myQuery(node);
                else if (node[0].parentNode)
                    return myQuery.fn.inParent(selector, node[0].parentNode);
            } else if (node.isElement(selector))
                return myQuery(node);
            else
                return myQuery.fn.inParent(selector, node[0].parentNode);

            return myQuery();
        },
        //zavislosti : not, inParent
        isElement: function(nm){
            if (!this[0]) return false;
            if (this[0].nodeName.toLowerCase()==nm)
                return true;
            else
                return false;
        },
        //zavislosti: addClass, toggleClass, not, inParent
        hasClass : function(selector){
            var className = selector,
                rclass = /[\t\r\n\f]/g;

            for (var i=0;i<this.length;i++) {
                if (this[i].className.replace(rclass, ' ').split(' ').indexOf(selector)>-1)
                    return true;
            }
            return false;
        },
        //zavislosti: not, inParent
        hasId : function(selector){
            if (!this[0] || !selector) return false;
            if (this[0].id==selector)
                return true;
            else
                return false;
        },
        //zavislosti: toggleClass
        addClass : function(c){
            if (!c) return this;
            return this.each(function(){
                if (!this.hasClass(c)){
                    this[0].className = this[0].className+' '+c;
                }
            });
        },
        removeClass : function(c) {
            if (!c) return this;
            var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
            for(var i=0;i<this.length;i++){
                this[i].className = this[i].className.replace(re, '');
            };
            return this;
        },
        toggleClass : function(c){
            if (!c) return this;
            return this.each(function(){
                if (this.hasClass(c))
                    this.removeClass(c);
                else
                    this.addClass(c);
            });
        },
        //zavislosti: animate, width, height, fadeIn, fadeOut, tadeToggle, position
        css : function(object){
            if (!object && this[0])
                return window.getComputedStyle(this[0]);

            for (var key in object){
                var px = 0;
                if (key=='left' || key=='right' || key=='top' || key=='bottom')
                    var px = 1;

                if (key=='height' || key=='width' || px==1)
                    if (myQuery.is.numeric(object[key])){
                        object[key] = object[key]+'px';
                    }
            };

            return this.each(function(){
                this.prop(object, 'style');
            });
        },
        //zavislosti: fadeIn, fadeOut, fadeToggle, slideUp, slideDown, slideToggle
        animate : function(object, duration, callback, easing){
            if (!duration)
                var duration = 500;
            if (typeof callback=='string')
                var easing = callback;
            var easing = (easing in myQuery.core.easing) ? easing : 'swing';
            return this.each(function(){
                var e = this,
                    css = e.css(),
                    ep = {};

                //Odklonuje css style
                for (var name in object){
                    ep[name] = css[name];
                };

                myQuery.core.animate({
                    duration: duration,
                    easing : easing,
                    callback: function(){
                        if (typeof callback=='function')
                            callback.call(e);
                    },
                    progress: function(delta) {
                        for (var key in object){
                            var prop = {},
                                es = parseFloat(ep[key])||0;

                            if (key=='opacity' && myQuery.browser.name=='msie')
                                e[0].style.filter = 'alpha(opacity=' + ((object[key]>0) ? (0 + delta) : (1 - delta))*100 + ')';

                            prop[key] = es+((object[key]-es)*delta)+((key!='opacity') ? 'px' : '');
                            e.prop(prop, 'style');
                        };
                    }
                });
            });
        },
        width: function(){
            if (!this[0] || this.length!=1) return;
            return parseFloat(this.css().width)||0;
        },
        height: function(){
            if (!this[0] || this.length!=1) return;
            return parseFloat(this.css().height)||0;
        },
        //zavislosti: scrollTo
        scrollTop : function(){
            if (!this[0]) return;
            if (this[0]!=document && typeof this[0].nodeType!=undefined && this[0]!=window)
                return parseFloat(this[0].scrollTop)||0;
            else
                return window.scrollY||window.pageYOffset||document.getElementsByTagName('html').item(0).scrollTop||0;
        },
        position : function(){
            if (!this[0]) return;
            return { top : parseFloat(this[0].offsetTop)||0, left : parseFloat(this[0].offsetLeft)||0 };
        },
        scrollTo: function(to, duration, callback, type){
            var defaultThis = this;
            if (typeof duration=='function'){
                var type = callback,
                    callback = duration,
                    duration = false;
            }
            if (typeof to=='number')
                var top = to;
            else if (typeof to=='object' && to[0]){
                var e = (to[0].nodeType) ? to[0] : to,
                    top = myQuery(e).position().top;
            } else if (typeof to=='string' && this[0]){
                var e = this[0]==document || this[0]==window ? mq(to) : this.find(to),
                    top = e.position().top;
            }

            return this.each(function(){
                var t = this,
                    now = t.scrollTop(),
                    where = top-now,
                    eas = (type in myQuery.core.easing) ? type : 'swing';

                if (where==0){
                    if (typeof callback=='function')
                        return callback.call(myQuery(e));
                }

                if (!duration){
                    if (typeof callback=='function')
                        callback.call(myQuery(e));
                    return (t==document || t==window) ? window.scrollTo(0, to) : t[0].scrollTop = top;
                }

                myQuery.core.animate({
                    duration: duration,
                    easing : eas,
                    callback: function(){
                        if (typeof callback=='function')
                            callback.call(myQuery(e));
                    },
                    progress: function(delta) {
                        return (t[0]==document || t[0]==window) ? window.scrollTo(0, now+(where*delta)) : t[0].scrollTop = now+(where*delta);
                    },
                    delay : 5
                });
            });
        },
        delay : function(callback, d){
            var delay = parseInt(d)||0,
                t = this;

            if (typeof callback=='number'){
                var delay = callback,
                    callback = d;
            }

            setTimeout(function(){
                callback.call(t);
            }, delay)
            return this;
        },
        //zavislosti: toggle
        hide : function(){
            return this.each(function(){
                if (typeof this[0].myQuery!='object')
                    this[0].myQuery = {};

                var display = window.getComputedStyle(this[0]).display;
                if (display!='none')
                    this[0].myQuery['defaultDisplay'] = display;

                this[0].style.display = 'none';
            });
        },
        //zavislosti: toggle
        show : function(){
            return this.each(function(){
                var display = (this[0].myQuery) ? this[0].myQuery.defaultDisplay : 'block';
                this[0].style.display = display;
            });
        },
        toggle : function(){
            return this.each(function(){
                if (window.getComputedStyle(this[0]).display=='none')
                    this.show();
                else
                    this.hide();
            });
        },
        fadeOut : function(duration, callback, type){
            return this.each(function(){
                myQuery.core.fade('fadeOut', this, duration, callback, type);
            });
        },
        fadeIn : function(duration, callback, type){
            return this.each(function(){
                myQuery.core.fade('fadeIn', this, duration, callback, type);
            });
        },
        fadeToggle : function(duration, callback, type){
            return this.each(function(){
                myQuery.core.fade('fadeIn', this, duration, callback, type, true);
            });
        },
        slideUp : function(duration, callback, easing){
            return this.each(function(){
                var display = this.css().display;
                if (display=='none')
                    return;

                myQuery.core.slideOptions(this, function(){
                        var e = this,
                            call = function(){
                            e.prop({'sliding' : false}).css({ height : '', marginTop : '', marginBottom : '', paddingTop : '', paddingBottom : '', display : 'none', overflow : '' });

                            if(e.prop('defaultDisplay')==undefined)
                                e.prop({ defaultDisplay : display })

                            if (typeof callback=='function')
                                return callback.call(e);
                        };

                    if (typeof callback=='string')
                        var easing = callback;

                    e.animate({ height : 0, marginTop : 0, marginBottom : 0, paddingTop : 0, paddingBottom : 0 }, duration, call, easing);
                })
            });
        },
        slideDown : function(duration, callback, easing){
            return this.each(function(){
                if (typeof callback=='string')
                    var easing = callback;

                if (this.css().display!='none')
                    return;

                myQuery.core.slideOptions(this, function(defaultCss, display){
                    var e = this;
                        css = { mt : parseFloat(defaultCss.marginTop)||0, mb : parseFloat(defaultCss.marginBottom)||0, pt : parseFloat(defaultCss.paddingTop)||0, pb : parseFloat(defaultCss.paddingBottom)||0 },
                        call = function(){
                            e.prop({'sliding' : false}).css({ height : '', marginTop : '', marginBottom : '', paddingTop : '', paddingBottom : '', overflow : '' });

                            if (typeof callback=='function')
                                return callback.call(e);
                        };
                    if (e[0].style.display=='none' || display=='none' || parseInt(defaultCss.height)==0)
                        e.css({ marginTop : 0, marginBottom : 0, paddingTop : 0, paddingBottom : 0 });

                    var height = ((css.mt>0 || css.pt>0 || css.mb>0 || css.pb>0) && display!='none' ? (css.mt+css.mb+css.pb+css.pt) : 0);
                    e.animate({ height : e[0].scrollHeight-height, marginTop : css.mt, marginBottom : css.mb, paddingTop : css.pt, paddingBottom : css.pb }, duration, call, easing);
                }, 'slideDown');
            });
        },
        slideToggle : function(duration, callback, easing){
            return this.each(function(){
                var display = this.css().display;
                if ((this.height()==0 && display!='inline') || display=='none')
                    this.slideDown(duration, callback, easing);
                else
                    this.slideUp(duration, callback, easing);
            });
        },
        append : function(e){
            return myQuery.core.insertElement(this, e, 'append');
        },
        prepend : function(e){
            return myQuery.core.insertElement(this, e, 'prepend');
        },
        html : function(e){
            if (typeof e=='string' || typeof e=='number')
                return this.each(function(){
                    this[0].innerHTML = e;
                });
            else {
                if (!this[0]) return '';
                return this[0].innerHTML;
            }
        },
        val : function(e){
            if (typeof e=='string' || typeof e=='number')
                return this.each(function(){
                    this[0].value = e;
                });
            else {
                if (!this[0]) return '';
                return this[0].value;
            }
        },
        focus : function(){
            if (this[0])
                this[0].focus();
            return this;
        },
        sendForm : function(action, callback){
            if (!this.length)
                return this;

            var form = (this.nodeType) ? this : this[0];
                content = new Object(),
                action = action||form.action||'',
                files = 0;

            if (!callback)
                var callback = function(){ };

            if (typeof action==='function' || typeof action==='object'){
                var callback = action,
                    action = form.action||'';
            }

            //Vytiahne hodnoty z inputov
            for (var i = 0;i<form.length;i++){
                var f = form[i],
                    ft = f.type,
                    fn = f.name;

                if ((ft=='checkbox' || ft=='radio') && f.checked===false)
                    continue;

                if (ft!='button' && ft!='file' && fn){
                    if (fn in content){
                        var c = content[fn],
                            d = Array.isArray(c) ? c : new Array(c);
                        d.push(f.value);
                        content[fn] = d;
                    } else {
                        content[fn] = f.value;
                    }
                } else if (ft=='file'){
                    if (typeof content[f.name]!='undefined'){
                        var array = new Array(),
                            c = content[fn]||{};
                        for(var a=0;a<c.length;a++){ array[a] = c[a]; }
                        for(var a=0;a<f.files.length;a++){ array[c.length+a] = f.files[a]; }
                        content[fn] = array;
                    } else {
                        content[fn] = form[i].files;
                    }
                    files++;
                }
            };

            //Nastavi metodu odoslania formulara
            if (form.method.toLowerCase()=='get'){
                var type = (action.indexOf('?')>1) ? '&' : '?',
                    action = action+type+content,
                    content = {};
            };

            myQuery.ajax(action, content, callback, this);
            return this;
        },
        //zavislosti: click, submit (window on load)
        on : function(on, select, callback, remove){
            var single,
                size = on.split(' ');

            if (typeof select==='function'){
                var remove = callback,
                    callback = select,
                    select = null;
            }

            return this.each(function(){
                var e = this;

                var eventBack = function(event){
                    if (select){
                        var element = event.srcElement||event.target||event.toElement;
                        e = myQuery(element).inParent(select);
                        if (e.length==0)
                            return true;
                    }

                    if (remove==true && window.removeEventListener)
                        this.removeEventListener(on, eventBack);

                    if (callback.call(e, event)==false){
                        if(event.preventDefault)
                            event.preventDefault();

                        return false;
                    }
                };

                for (i=0;i<size.length;i++){
                    if (window.addEventListener)
                        e[0].addEventListener(size[i], eventBack);
                    else
                        e[0].attachEvent('on'+size[i], eventBack);
                }
            });
        },
        clone : function(){
            var nodes = new Array();
            this.each(function(i){
                nodes[i] = this[0].cloneNode(true);
            });
            if (!nodes.length)
                var nodes = null;
            return myQuery(nodes);
        },
        merge : function(selector){
            var nodes = [],
                c = 0,
                selector = myQuery.is.object(selector) ? selector : myQuery(selector);
                i;

            for (i=0;i<this.length;i++,c++)
                nodes[c] = this[i];            
            for (i=0;i<selector.length;i++,c++)
                if (nodes.indexOf(selector[i])==-1)
                    nodes[c] = selector[i];
                else
                    c--;

            return myQuery(nodes);
        }
    };

    //Jadro
    myQuery.core = {
        selector : 'myQuery',
        makeArray : function(object, makeObject){
            if (myQuery.is.object(object)==false && typeof object!='function')
                return object;

            var o = (!object.length || object.nodeName=='FORM' || object.nodeName=='SELECT' || object==document || object==window) ? new Array(object) : object;
            if (myQuery.browser.name!='msie' && myQuery.browser.name!='firefox' && makeObject!=true){
                o.__proto__ = myQuery.fn;
                if (typeof o.each!='function') //Ak by sa nepodarilo prototypovat array, tak bude myQuery zmenene na objekt
                    return this.makeArray(object, true);
                return o;
            } else {
                var a = myQuery();
                a.length = o.length;
                for(var i=0;i<o.length;i++){
                    a[i] = o[i];
                }
                return a;
            }
        },
        easing : {
            linear : function(p){
                return p;
            },
            sine : function (Fz) {
                return (Math.sin(Fz * Math.PI / 2));
            },
            cosine : function (Fz) {
                return ((-Math.cos(Fz * Math.PI) / 2) + 0.5);
            },
            tan : function (F0) {
                var Fz = Math.tan;
                return (Fz(1 * (2 * F0 - 1)) / Fz(1) + 1) / 2;
            },
            wobble : function (Fz) {
                return (-Math.cos(Fz * Math.PI * (9 * Fz)) / 2) + 0.5;
            },
            circle : function (Fz) {
                return Math.sqrt(1 - Math.pow((Fz - 1), 2));
            },
            pulsate : function (Fz) {
                return (0.5 + Math.sin(17 * Fz) / 2);
            },
            expo : function (Fz) {
                return Math.pow(2, 8 * (Fz - 1));
            },
            loop : function (Fz) {
                return (-Math.cos(2 * Fz * Math.PI) / 2) + 0.5;
            },
            bounce : function (Fz) {
                return 1 - (Math.cos(Fz * 4.5 * Math.PI) * Math.exp(-Fz * 6));
            },
            swing: function(p) {
                return 0.5 - Math.cos(p * Math.PI) / 2;
            },
            swingTo : function (F0) {
                var Fz = 1.70158;
                return (F0 -= 1) * F0 * ((Fz + 1) * F0 + Fz) + 1;
            },
            swingToFrom : function (F0) {
                var Fz = 1.70158;
                if ((F0 /= 0.5) < 1) {
                    return 0.5 * (F0 * F0 * (((Fz *= (1.525)) + 1) * F0 - Fz));
                }
                return 0.5 * ((F0 -= 2) * F0 * (((Fz *= (1.525)) + 1) * F0 + Fz) + 2)
            }
        },
        animate: function(options){
            var start = new Date;
            var id = setInterval(function() {
                var timePassed = new Date - start,
                    progress = timePassed / options.duration;

                if (progress > 1)
                    progress = 1;

                options.progress(myQuery.core.easing[options.easing||'swing'](progress));
                if (progress == 1) {
                    clearInterval(id);
                    if (options.callback)
                        options.callback();
                }
            }, options.delay || 10);
        },
        fade: function(type, e, duration, callback, easing, toggle){
            if (e.length!=1) return;
            var duration = duration||500,
                property = e.css(),
                easing = (typeof callback=='string') ? callback : type;
                easing = (easing in myQuery.core.easing) ? easing : 'linear';
                toggle;

            if (type=='fadeIn'){
                if (property.display!='none' && property.opacity==1){
                    if (toggle==true)
                        e.fadeOut(duration, callback);
                    return false;
                }
                var display = e.css({ display : '' }).css().display,
                    to = 1;
                e.css({ 'opacity' : 0, display : (e.prop('defaultDisplay') && e.prop('defaultDisplay')!='none' ? e.prop('defaultDisplay') : (display=='none' ? 'inline-block' : display) ) })
            } else {
                if (property.display=='none' && property.opacity==0){
                    if (toggle==true)
                        de.fadeIn(duration, callback);
                    return false;
                }

                e.css({ opacity : 1, display : property.display });
                var e = e.prop({'defaultDisplay' : property.display});
                var to = 0;
            }

            if(e.prop('animate')==true){
                return false;
            } else
                e.prop({ animate : true });

            myQuery(e).animate({ opacity : to }, duration, function(){
                e.prop({ animate : false });

                if (type=='fadeOut')
                    e.css({ display : 'none' });

                if (typeof callback=='function')
                    callback.call(e);
            }, easing)
        },
        insertElement : function(obj, element, where){
            var d = (element.nodeType || typeof element=='string') ? element : element[0],
                object = (myQuery.is.object(d)) ? 1 : 0;

            return obj.each(function(){
                if (where=='append'){
                    if (object)
                        this[0].appendChild(d.cloneNode(true));
                    else
                        this[0].insertAdjacentHTML('beforeend', d);
                } else {
                    if (object)
                        this[0].insertBefore(d.cloneNode(true), this.child(1)[0])
                    else
                        this[0].insertAdjacentHTML('afterbegin', d);
                }
            });
        },
        getElementsByClassName : function (node, classname) {
            var a = [],
                re = new RegExp('(^| )'+classname+'( |$)'),
                els = node.getElementsByTagName("*");
            for(var i=0,j=els.length;i<j; i++)
                if(re.test(els[i].className))
                    a.push(els[i]);
            return a;
        },
        //Nahrada za childnodes, pretoze vracaju zly vysledok
        sibling: function( n, elem ) {
            var r = [];
            for ( ; n; n = n.nextSibling ) {
                if ( n.nodeType === 1 && n !== elem ) {
                    r.push( n );
                }
            }
            return r;
        },
        slideOptions : function(e, callback, type){
            if (e.prop('sliding'))
                return;

            e.prop({'sliding' : true});

            var css = e.css(),
                display = css.display;

            e.css({ overflow : 'hidden', opacity : 1 });

            //Kvoli bugu pri prepocitavani paddingu s hodnotou v percentach
            setTimeout(function(){
                if (display=='none' || display=='inline'){
                    var dd = e.prop('defaultDisplay'),
                        ddd = e.css({ display : '' }).css().display,
                        ddd = ddd=='none' ? 'block' : ddd;
                        obj = type=='slideDown' ? { height : 0, display : display=='inline' ? 'inline-block' : dd ? (dd=='inline' || dd=='none' ? 'inline-block' : dd) : (ddd ? ddd : 'inline-block')  } : { display : display=='inline' ? 'inline-block' : 'block'  };
                    e.css(obj);
                }

                callback.call(e, css, display);
            }, 0);
        }
    };

    //Javascript myQuery selector
    myQuery.selector = function(selector, dom){
        var dom = (dom) ? dom : document;

        if (typeof dom===undefined)
            return;

        //Document querySelectorAll IE 7-
        if (dom.querySelectorAll===undefined){
            (function(d, s) {
                s=document.createStyleSheet();
                d.querySelectorAll = function(r, c, i, j, a) {
                    a=d.all, c=[], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
                    for (i=r.length; i--;) {
                        s.addRule(r[i], 'k:v');
                        for (j=a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
                        s.removeRule(0);
                    }
                    return c;
                }
            })(dom);
        }

        return dom.querySelectorAll(selector);
    };

    myQuery.merge = function(obj1, obj2, length){
        if (myQuery.is.array(obj1) && myQuery.is.array(obj2))
            return obj1.concat(obj2);
        else if (myQuery.is.object(obj1) && myQuery.is.object(obj2)){
            var obj = {},
                c = 0;
            for (var key in obj1){
                obj[key] = obj1[key];
                c++;
            }
            for (var key in obj2){
                obj[key] = obj2[key];
                c++;
            }
            if (length)
                obj.length = c;

            return obj;
        }
        return obj1;
    }

    myQuery.each = function(object, callback){
        var i = 0;

        if (object && object.length || object.nodeType || myQuery.is.array(object)){
            if (!object.length)
                var object = new Array(object);

            for (var i=0;i<object.length;i++){
                var obj = myQuery.core.makeArray(object[i]);
                callback.call(obj, i, obj);
            }
            return myQuery.core.makeArray(object);
        } else if (!object.nodeType && !object.length && object.length!=0) {
            for (var key in object){
                callback.call(object[key], i, object[key], key);
                i++;
            }
        }
        return object;
    };

    myQuery.ajax = function(action, content, callback, element){
        var filedata = '',
            postdata = new Array(),
            data = '',
            files = new Array(),
            post;

        if (!content)
            var content = function(){};

        if (typeof content=='function' || typeof content.success=='function' || typeof content.progress=='function' || typeof content.error=='function'){
            var callback = content,
                content = '';
        } else if (typeof content==='object'){
            var post = true;
            for(var key in content){
                var ck = content[key],
                    ctype = typeof ck;
                if (ctype!='undefined'){
                    if (ctype=='object'){
                        for (var f=0;f<ck.length;f++){
                            if (typeof ck[f]=='string'){
                                var uc = encodeURIComponent(ck[f]),
                                    data = data+key+'='+uc+'&';
                                postdata.push({ 'key' : key, 'content' : uc});
                            } else {
                                files.push({ 'key' : key, 'file' : ck[f]});
                            }
                        }
                    } else {
                        var uc = encodeURIComponent(ck),
                            data = data+key+'='+uc+'&';
                        postdata.push({ 'key' : key, 'content' : uc});
                    }
                }
            }

            var data = data.substr(0, data.length-1);
        }

        var method = (post) ? 'post' : 'get',
            element = element||'';

        var xhr = new XMLHttpRequest(),
            object_callback = typeof callback.success=='function' || typeof callback.progress=='function';

        if (object_callback && typeof callback.progress=='function' && xhr.upload) {
            xhr.upload.addEventListener('progress', function(e){
                var p = Math.ceil(e.loaded/e.total * 100);
                callback.progress.call(element||p, p);
            }, true);
        }

        xhr.open(method, (action ? action : window.location.href), true);
        if (files.length>0 && typeof FormData=='function'){
            var formData = new FormData();

            for(var f=0;f<files.length;f++){
                formData.append(files[f]['key'], files[f]['file'], files[f]['file'].name)
            };

            for(var f=0;f<postdata.length;f++){
                formData.append(postdata[f]['key'], postdata[f]['content'])
            };

            xhr.send(formData);
        } else {
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(data);
        }

        xhr.onreadystatechange = function(e){
            if (xhr.readyState==4 && callback){
                if (myQuery.browser.name=='msie')
                    xhr.response = xhr.responseText;
                if ((xhr.status>=200 && xhr.status<300) || xhr.status == 304)
                    if (!object_callback)
                        callback.call(element||xhr, xhr)
                    else
                        callback.success.call(element||xhr.responseText, xhr.responseText);
                else if (callback.error)
                    callback.error.call(element||xhr, xhr);
            }
        };
        return this;
    };

    myQuery.browser = function(){
        var ua = navigator.userAgent.toLowerCase(),
            u = undefined,
            browser = function(){
            var browsers = { 'chrome' : /chrome\/(.*?) /, 'opera' : /opera\/(.*?) /, 'firefox' : /firefox[\/\s](\d+\.\d+)/, 'msie' : /msie (.*?);/, 'safari' : /version\/(.*?) / };
            for (var key in browsers){
                if (ua.indexOf(key) >= 0)
                    return [key, browsers[key]];
            }
            return [u, u];
        }();

        if (browser[1] && browser[0]!=u){
            var version = ua.match(browser[1]);
            browser[1] = version ? version[1] : u;
        }
        else if ((window.ActiveXObject || "ActiveXObject" in window)) //Detekuje IE11
            var browser = [ 'msie', 11 ];
        else
            var browser = [ browser[0], u ]

        return { name : browser[0], version : browser[1] };
    }();

    myQuery.parseJSON = function(object){
        try {
            return JSON.parse(object);
        } catch(e) {
            return new Object();
        }
    }

    myQuery.is = {
        email : function(email) {
            var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,8})?$/;
            if (!email)
                return false;
            return r.test(email);
        },
        clear : function(s){
            return s+''.replace(/ /g, '');
        },
        numeric: function( obj ) {
            return obj - parseFloat( obj ) >= 0;
        },
        object : function(object){
            var type = typeof object;
            if (myQuery.browser.name!='safari')
                return type === 'object';
            else {
                var proto = Object.prototype.toString.call(object);
                return (type=='object' || proto=='[object Object]' || proto=='[object NodeList]' || proto=='[object Array]' || proto.indexOf('HTML')>-1);
            }
        },
        array : function(object) {
            var type = typeof object;
            if (myQuery.browser.name!='safari')
                return Array.isArray(object);
            else {
                var proto = Object.prototype.toString.call(object);
                return (proto=='[object Array]' || proto=='[object NodeList]' || proto.indexOf('HTML')>-1);
            }
        }
    };

    //Fixes
    (function(){
        //window.getComputedStyle fix
        if (!window.getComputedStyle)
            window.getComputedStyle = function(e) {
                return e.currentStyle;
            }

        //Console.log IE
        if (!window.console)
            window.console = { log: function() { } };

        //IndexOf IE 7,8
        if (!Array.prototype.indexOf){
            Array.prototype.indexOf = function(elt , from){
            var len = this.length >>> 0;

            var from = Number(arguments[1]) || 0;
            from = (from < 0) ? Math.ceil(from) : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++){
                if (from in this && this[from] === elt)
                    return from;
                };
                return -1;
            };
        };

        //isArray
        if(!Array.isArray) {
            Array.isArray = function(arg) {
                return Object.prototype.toString.call(arg) === '[object Array]';
            };
        };

        //HTML 5 FIX
        if (myQuery.browser.name=='msie' && myQuery.browser.version<=8){
            document.createElement('header');
            document.createElement('footer');
            document.createElement('section');
            document.createElement('aside');
            document.createElement('nav');
            document.createElement('article');
        };

        //JSON FIX
        if (typeof JSON !== 'object') {
            JSON = {};
            (function () {
                'use strict';

                function f(n) {
                    return n < 10 ? '0' + n : n;
                }
                if (typeof Date.prototype.toJSON !== 'function') {
                    Date.prototype.toJSON = function (key) {
                        return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
                    };
                    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
                        return this.valueOf();
                    };
                }
                var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                    gap, indent, meta = {
                        '\b': '\\b',
                        '\t': '\\t',
                        '\n': '\\n',
                        '\f': '\\f',
                        '\r': '\\r',
                        '"': '\\"',
                        '\\': '\\\\'
                    },
                    rep;

                function quote(string) {
                    escapable.lastIndex = 0;
                    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                        var c = meta[a];
                        return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    }) + '"' : '"' + string + '"';
                }

                function str(key, holder) {
                    var i, k, v, length, mind = gap,
                        partial, value = holder[key];
                    if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
                        value = value.toJSON(key);
                    }
                    if (typeof rep === 'function') {
                        value = rep.call(holder, key, value);
                    }
                    switch (typeof value) {
                    case 'string':
                        return quote(value);
                    case 'number':
                        return isFinite(value) ? String(value) : 'null';
                    case 'boolean':
                    case 'null':
                        return String(value);
                    case 'object':
                        if (!value) {
                            return 'null';
                        }
                        gap += indent;
                        partial = [];
                        if (Object.prototype.toString.apply(value) === '[object Array]') {
                            length = value.length;
                            for (i = 0; i < length; i += 1) {
                                partial[i] = str(i, value) || 'null';
                            }
                            v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                            gap = mind;
                            return v;
                        }
                        if (rep && typeof rep === 'object') {
                            length = rep.length;
                            for (i = 0; i < length; i += 1) {
                                if (typeof rep[i] === 'string') {
                                    k = rep[i];
                                    v = str(k, value);
                                    if (v) {
                                        partial.push(quote(k) + (gap ? ':' : ':') + v);
                                    }
                                }
                            }
                        } else {
                            for (k in value) {
                                if (Object.prototype.hasOwnProperty.call(value, k)) {
                                    v = str(k, value);
                                    if (v) {
                                        partial.push(quote(k) + (gap ? ':' : ':') + v);
                                    }
                                }
                            }
                        }
                        v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                        gap = mind;
                        return v;
                    }
                }
                if (typeof JSON.stringify !== 'function') {
                    JSON.stringify = function (value, replacer, space) {
                        var i;
                        gap = '';
                        indent = '';
                        if (typeof space === 'number') {
                            for (i = 0; i < space; i += 1) {
                                indent += ' ';
                            }
                        } else if (typeof space === 'string') {
                            indent = space;
                        }
                        rep = replacer;
                        if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
                            throw new Error('JSON.stringify');
                        }
                        return str('', {
                            '': value
                        });
                    };
                }
                if (typeof JSON.parse !== 'function') {
                    JSON.parse = function (text, reviver) {
                        var j;

                         function walk(holder, key) {
                             var k, v, value = holder[key];
                             if (value && typeof value === 'object') {
                                for (k in value) {
                                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                                        v = walk(value, k);
                                        if (v !== undefined) {
                                            value[k] = v;
                                        } else {
                                            delete value[k];
                                        }
                                    }
                                }
                            }
                            return reviver.call(holder, key, value);
                        }
                        text = String(text);
                        cx.lastIndex = 0;
                        if (cx.test(text)) {
                            text = text.replace(cx, function (a) {
                                return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                            });
                        }
                        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                            j = eval('(' + text + ')');
                            return typeof reviver === 'function' ? walk({
                                '': j
                            }, '') : j;
                        }
                       throw new SyntaxError('JSON.parse');
                   };
                }
            }());
        }
    }());

    //Zadefinuje sa myquery object
    myQuery.fn.core = function(callback){
        if (!callback)
            return this;

        var callback_type = typeof callback;
        if (callback_type === 'string'){
            var result = myQuery.selector(callback);
            return result.length>0 ? myQuery.core.makeArray(result) : myQuery();
        } else if (myQuery.is.object(callback)){
            var callback = myQuery.core.makeArray(callback);
            if (!callback.length)
                callback.length = 1;
            return callback;
        } else if (callback_type == 'function'){
            return myQuery(window).on('load', function(){
                return callback(myQuery);
            });
        }
    };

    //Ulozia sa vsetky funkcie do objektu core ktory potom myQuery nacitava
    myQuery.fn.core.prototype = myQuery.fn;

    //Zadefinuju sa eventy do funkcii (musi byt na konci kvôli IE)
    myQuery.each('blur focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(' '), function(i, name){
        myQuery.fn[name] = function(callback, removeEvent){
            if (callback)
                return this.on(name, callback, removeEvent);
            else {
                var evt = document.createEvent('MouseEvents');
                evt.initMouseEvent(name, true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

                return this.each(function(){
                    this[0].dispatchEvent(evt);
                });
            }
        }
    });

    //Selectors
    window.myQuery = myQuery;
    window.mq = myQuery;
}());