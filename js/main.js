mq(function(){
    var start = +new Date();
    mq.fn.render_textarea = function(start){
        var source = '',        
            value = this.val().replace(/\t/mg, ''),
            value = start==1 ? value.replace(/\n{1}$/, '') : value;
            array = value.split('\n'),
            line = array,
            height_ = ( line.length ) * 18,
            count = this.prev();

        count.html('');
        this.css({ height : height_ });
        
        for (var i=0;i<line.length;i++){
            count.append('<i>'+ (i+1) +'</i>');
            var source = source+line[i]+(i+1!=line.length && start==1 ? '\n' : '');
        }
        this.val(source);
    }

    mq('textarea').each(function(){
        this.render_textarea(1);
    }).on('keyup', function(e){
        //if (e.keyCode==13 || e.keyCode==8 || e.keyCode==46)
        //    this.render_textarea(0);
    });


    var functions = mq('#funkcie'),
        gotop = mq('#goTop');
  
    function loadFunctions(sort){
        var rows = [],
            array = [];
        mq('#dokumentacia article').each(function(i){
            rows[this.find('h2').html()] = { id : this[0].id,  name : this.find('h2').html()}
            array.push(this.find('h2').html());
        });

        if (sort==1){
            functions.find('p').remove();
            var array = array.sort();
        }

        for (var i=0;i<array.length;i++){
            var row = rows[array[i]];
            functions.append( '<p><small>'+(i+1)+':</small><a class="scroll g" href="#'+row.id+'">'+row.name +'</a></p>' );
        }
    }
    loadFunctions(0);
    mq('#sort').click(function(){
        loadFunctions(1);
        this.fadeOut();
        return false;
    })

    mq('body').on('click', '.scroll', function(){
        var e = this,
            id = '#'+this.attr('href').split('#')[1],
            go = mq(id);

        mq(document).scrollTo(go, 1500, function(){
            if (e.hasClass('g'))
                go.find('textarea').focus();
            window.location.hash = id;
        });
        return false;
    });

    function renderHeader(){
        var time = 300,
            animation = 'bounce';
        mq('header').animate({ width : 500 }, time + 100, function(){
            this.animate({ left : 259 }, time, function(){
                this.animate({ width : 759, left : 0 }, time, function(){
                    if (window.location.hash && window.location.hash!='#top'){
                        var go = mq(window.location.hash);
                        mq(document).scrollTo(go, 1000);
                        go.find('textarea').focus();
                    }
                }, 'swingTo').find('h1').animate({ fontSize : 28 }, time+300, animation);
            }, animation)
        }, 'swingTo').find('h1').animate({ fontSize : 48 }, time, animation);
    }

    if (window.location.hash)
        if (mq.browser.name=='msie' && mq.browser.version<=10 || window.location.hash=='#top'){
            mq(document).scrollTo(0);
            renderHeader();
        } else {
            mq(document).scrollTo(0, 1000, function(){
                renderHeader();
            });
        }
    else
        renderHeader();

    mq(document).on('scroll', function(e){
        if (this.scrollTop()>100)
            gotop.fadeIn();
        else
            gotop.fadeOut();
    });
    var end = +new Date();
    console.log('myQuery boot: '+(end-start)+'ms'); 
});