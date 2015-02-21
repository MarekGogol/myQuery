<?php 
$files = scandir('js/');
$myquery = explode('-', end($files));
$version = substr($myquery[1], 0, 5);
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>myQuery <?php echo $version ?></title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script type="text/javascript" src="js/myQuery-<?php echo $version ?>.js"></script>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/main.js"></script>
</head>
<body id="top">
<header>
	<div class="title">
		<h1>myQuery <small><?php echo $version ?></small></h1>
		<p>Simple, fast, small, JavaScript library, IE 5++</p>
	</div>
	<ul>
		<li><a class="scroll" href="#funkcie">Funkcie</a></li>
		<li><a class="scroll" href="#dokumentacia">Dokumentácia</a></li>
		<li><a class="scroll" href="#do
		nload">Download</a></li>
	</ul>
</header>

<nav>
	<h2 class="title">Čo je myQuery?</h2>
	<p>myQuery je nová JavaScriptová knižnica, podobná jQuery, len s tým rozdielom, že je rychlejšia, a omnoho krát menšia oproti jQuery. Taktiež ďalšia výhoda je, že v starých browseroch opravuje defaultne javascriptové funkcie ako napríklad <small>getComputedStyle</small>, <small>console.log</small>, <small>isArray</small>, <small>indexOf</small>, <small>JSON.parse</small>, <small>JSON.stringify</small> a taktiež netreba zabudnúť aj na podporu <strong><small>HTML 5</small></strong> tagov.</p>
</nav>

<nav id="download">
	<h2 class="title">Download</h2>
	<p><a href="js/<?php echo $files[count($files)-2]; ?>"><?php echo $files[count($files)-2]; ?></a> - Full version</p>
	<p><a href="js/<?php echo end($files); ?>"><?php echo end($files); ?></a> - minified version <small>(<?php echo substr(filesize('js/'.end($files))/1000, 0, 4) ?>kb)</small></p>
</nav>

<nav id="funkcie">
	<h2 class="title">Zoznam funkcií</h2>
	<a href="#" id="sort">Zoradiť podľa abecedy</a>
</nav>

<nav id="dokumentacia">
	<h2 class="title">Dokumentácia</h2>
	<article id="mq">
		<h2>mq(<span>selector/callback/objekt</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq(function(){
			    var element = mq('nav article a');
			    console.log( element ); //Vypíše element(y)


			    var css3 = mq('html body > header div.col-md-3:nth-child(3) a');
			});

			myQuery(function( mySelector ){ //Pri načitani dokumentu sa zavola funkcia, v ktorej parameter bude myQuery selektor
			    var element = mySelector('a');
			    console.log(element);
			});

			/*
			 * Zakladne selektory : myQuery, mq
			 */
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>mq()</strong> zavolá myQuery, môže obsahovať parameter s funkciou ktorá sa spustí pri načitani dokumentu, alebo selektor pri ktorom funkcia vráti vybraný element. Pri vloženi elementu/objektu do mq() bude daný objekt prototypovaný na myQuery.<br><br></p>
			<p><strong>Selektor podporuje</strong> #id, .class, element + vnáranie (div span a...) a CSS3 Selektor</p>
		</div>
	</article>  	

	<article id="find">
		<h2>find(<span>selector</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			var acka = mq('div').find('a');
			console.log(acka); //Vypiše všetky a elementy vo všetkych div elementoch
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>find()</strong> vyhľada všetky elementy v danom elemente.</p>
		</div>
	</article>

	<article id="not">
		<h2>not(<span>selector</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			var divka = mq('div').not('.auto'); //Vyberie všetky div elementy okrem toho ktorý ma class .auto
			var divka = mq('div').not('#lietadlo'); //Vyberie všetky div elementy okrem toho ktorý ma id #lietadlo
			var divka = mq('div').child().not('span'); //Vyberie všetky deti zo všetkych div elementov okrem dieťaťa typu "span"
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>not()</strong> vynecha všetky nechcene elementy.</p>
		</div>
	</article>

	<article id="each">
		<h2>each(<span>callback</span>) , mq.each(<span>object</span>, <span>callback</span>) </h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			//Prechadzanie elementov
			var acka = mq('div').find('a');
			acka.each(function(index, element){ //Prebehne všetky a elementy a vykona pre každý danu funkciu
			    var a = this;
			    console.log(a); //Vypiše dane a-čko, ktoré už je prototypované na myQuery v this
			});

			//Prechadzanie objektu
			var object = { 1 : { 'meno' : 'Marek', 'heslo' : 'tralalala' }, 2 : { 'meno' : 'Juro', 'heslo' : 12345 } }
			mq.each(object, function(index, key, object){
			    //...
			})
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>each()</strong> prebehne všetky elementy a vykonáva pre každý zavolanu funkciu.</p>
		</div>
	</article> 

	<article id="attr">
		<h2>attr(<span>selector</span>, <span>value</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			var element = mq('#element');
			element.attr('href', 'www.google.sk') //Zapíše do elementu atribút href s hodnotou google...

			var href = element.attr('href') //Vypíše atribút href z daného elementu
			console.log(href);
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>attr()</strong> uloži alebo vyberie atribút pre dany element/y.</p>
		</div>
	</article> 

	<article id="prop">
		<h2>prop(<span>objekt/selektor</span>, <span>názov objektu</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('nav').prop({ 'height' : '10px', 'width' : '10px' }, 'style');

			//je to iste ako:
			mq('nav')[0].style.height = '10px';
			mq('nav')[0].style.width = '10px';

			//Vracia hodnotu height z objektu style
			mq('nav').prop('height', 'style')
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>prop()</strong> uloži do objektu daneho elementu danu hodnotu. Ak miesto objektu bude vloženy názov objektu tak funkcia vrati hodnotu daneho objektu.</p>
		</div>
	</article>

	<article id="parent">
		<h2>parent(<span>multiple</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('nav').parent(); //Vráti rodiča z prvého vybraného nav elementu
			mq('nav').parent(true); //Vráti rodičov zo všetkych vybraných nav elementov
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>parent()</strong> vracia rodiča daneho elementu</p>
		</div>
	</article>

	<article id="child">
		<h2>child(<span>index/multiple</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('nav').child(); //Vráti všetky deti z prvého vybranného nav elementu
			mq('nav').child(3); //Vráti tretie dieťa v prvého vybranného nav elementu
			nav('nav').childs(true) //Vráti všetky deti zo všetkych vybranných nav elementov
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>child()</strong> vracia deti daneho elementu, pri vloženi indexu dieťaťa bude vratene dieťa v danom poradí.</p>
		</div>
	</article>

	<article id="eq">
		<h2>eq(<span>index</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('a').eq(3); //Vráti tretí "a" element zo všetkých vybraných "a" elementov
			mq('a').eq(-1); //Vráti posledný "a" element zo všetkých vybraných "a" elementov
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>eq()</strong> vracia element zo všetkých vybraných elementov z daným poradovím umiestnením.</p>
		</div>
	</article> 

	<article id="index">
		<h2>index(<span>index</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('div .class2').index(); //Vrati poradie z deťoch daneho elementu ".class2" v rodiči
			mq('div a').index(3); //Vrati tretí element z rodiča daneho lementu
			mq('div a').index(-1); //Vráti posledný element z rodiča daneho elementu.
			mq('div a').index('last'); //Vráti posledný element z rodiča daneho elementu.
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>index()</strong> pracuje s rodičom a vybera elementy v danom rodiči podľa poradového čísla. Ak nie je vložene poradie elementu tak bude vrátena hodnota na akom poradi sa nachádza dany element v rodiči.</p>
		</div>
	</article>

	<article id="pos">
		<h2>pos(<span>index</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('div .class2').pos(2); //Element ktorý je o dva elementy ďalej od daneho elementu
			mq('div .class2').pos(-2); //Element ktorý je o dva elementy za daným elementu
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>pos()</strong> vybera element ktorý je vzdialeny o poradie vloženého indexu od daneho elementu.</p>
		</div>
	</article> 

	<article id="first">
		<h2>first()</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('div .class2').first(); //Vybera prvý element v danom rodiči.
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>first()</strong> vybera prvý element z rodiča daneho elementu.</p>
		</div>
	</article>

	<article id="last">
		<h2>last()</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('div .class2').last(); //Vybera posledný element v danom rodiči
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>last()</strong> vybera posledný element z rodiča daneho elementu.</p>
		</div>
	</article>

	<article id="next">
		<h2>next(<span>index</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('div .class2').next(); //Vyberie element za daným elementom
			mq('div .class2').next(2); //Vyberie element ktory je vzdialeny o 2 elementy za danym elementom
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>next()</strong> vybera element element za daným elementom</p>
		</div>
	</article> 

	<article id="prev">
		<h2>prev(<span>index</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('div .class2').prev(); //Vyberie element pred daným elementom
			mq('div .class2').prev(2); //Vyberie element ktory je vzdialeny o 2 elementy pred danym elementom
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>prev()</strong> vybera element element pred daným elementom</p>
		</div>
	</article> 

	<article id="remove">
		<h2>remove()</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('nav a').prev(); //Vymaže všetky "a" elementy v danom elemente
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>remove()</strong> slúži na mazanie elementov.</p>
		</div>
	</article>

	<article id="inParent">
		<h2>inParent(<span>selector</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			var parent = mq('.class1').inParent('nav'); //Ak sa dany element ".class1" nachádza v rodiči "nav" tak funkcia vrati daneho rodiča
			
			if (parent.length==1)
			    return true;
			else
			    return false;
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>inParent()</strong> vracia true alebo, false ak sa dany element nachádza vo vybranom rodiči, alebo v prípade, že je druhý parameter true, tak funkcia vracia rovno daneho rodiča.</p>
		</div>
	</article>

	<article id="isElement">
		<h2>isElement(<span>selector</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('.class1').isElement('div'); //Ak je dany elementt "div" tak funkcia vracia true, ak nie tak false
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>isElement()</strong> vracia true, alebo false podľa toho či je dany typ elementu zhodný s daným parametrom.<p>
		</div>
	</article>

	<article id="hasClass">
		<h2>hasClass(<span>class</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('.auto').hasClass('auto'); //Ak ma dany element class auto, tak vracia true, ak nema tak false.
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>hasClass()</strong> vracia true, alebo false podľa toho či je element obsahuje dany class.<p>
		</div>
	</article>  

	<article id="hasId">
		<h2>hasId(<span>id</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#auto').hasId('auto'); //Ak dany element obsahuje id s hodnotou "auto", tak vracia true, ak nie tak false.
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>hasId()</strong> vracia true, alebo false podľa toho či je element obsahuje dané id.<p>
		</div>
	</article>

	<article id="addClass">
		<h2>addClass(<span>class</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').addClass('auto'); //Prida do daneho elementu class "auto"
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>addClass()</strong> pridáva do elementu class.<p>
		</div>
	</article> 

	<article id="removeClass">
		<h2>removeClass(<span>class</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').removeClass('auto'); //Zmaže z daneho elementu class "auto"
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>removeClass()</strong> maže z elementu class.<p>
		</div>
	</article> 

	<article id="toggleClass">
		<h2>toggleClass(<span>class</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').toggleClass('auto'); //Ak dany element obsahuje class, tak bude zmazany, no ak neobsahuje tak bude pridaný.
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>toggleClass()</strong> maže, alebo pridava class podľa toho či ho už ten element obsahuje.<p>
		</div>
	</article>

	<article id="css">
		<h2>css(<span>object</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').css({ height : 10, width : '15px', left : 5 }); //Zadefinuje elementu css hodnoty ktore su v objekte
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>css()</strong> pridava do objektu css hodnoty.<p>
		</div>
	</article>

	<article id="scrolltop">
		<h2>scrollTop()</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq(document).scrollTop(); //Vrati na akej Y pozicii sa nachádza okno
			mq('#element').scrollTop() //Vráti na akej pozicií sa nachádza dany element;
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>scrollTo()</strong> vráti poziciu elemenu pri skrolovani, alebo vrati poziciu skrollu.<p>
		</div>
	</article>

	<article id="scrollto">
		<h2>scrollTo(<span>object/positionTop</span>, <span>duration/callback</span>, <span>callback</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq(document).scrollTop( mq('.box'), 1000 ); //Za 1 sekundu sa odskroluje stránka k elementu ".box"
			mq(document).scrollTop(500, 300) //Stranka bude odskrolovaná na 500px zhora v podobe 300ms
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>scrollTo()</strong> odskroluje stránku na určitu polohu<p>
		</div>
	</article>

	<article id="position">
		<h2>position()</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			var position = mq('body').position(); //Vrati objekt pozicie body elementu
			position.top //pozicia z hora
			position.left //pozicia z ľava
			position.bottom //pozicia z dola
			position.right //pozicia z prava
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>position()</strong> vracia poziciu elementu<p>
		</div>
	</article>

	<article id="height">
		<h2>height()</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('body').height(); //Vrati výšku body
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>height()</strong> vracia výšku elementu<p>
		</div>
	</article>

	<article id="width">
		<h2>width()</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('body').width(); //Vrati šírku body
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>width()</strong> vracia šírku elementu<p>
		</div>
	</article>

	<article id="delay">
		<h2>delay(<span>callback</span>, <span>duration</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').delay(function(){
				//Tento script sa vykoná s neskorením jednej sekundy
			}, 1000); //1000 ms
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>delay()</strong> skryje element.<p>
		</div>
	</article>

	<article id="hide">
		<h2>hide()</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').hide(); //Skryje dany element(y)
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>hide()</strong> skryje element.<p>
		</div>
	</article>

	<article id="show">
		<h2>show()</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').show(); //Zobrazí dany element(y)
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>show()</strong> zobrazuje element.<p>
		</div>
	</article>

	<article id="toggle">
		<h2>toggle()</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').toggle(); //Zobrazí, alebo skryje dany element
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>toggle()</strong> zobrazuje, alebo skrýva element podľa toho či už je zobrazený alebo nie.<p>
		</div>
	</article>

	<article id="animate">
		<h2>animate(<span>duration</span>, <span>callback/animationType</span>, <span>animationType</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').animate({ height : 100, width: 500, left: 5 }, 2000, function(){
			    //Všetky css parametre, ktoré su v objekte budu vyanimované v podobe 2000ms
			});			

			mq('#element').animate({ height : 100, width: 500, left: 5 }, 2000, function(){
			    //Všetky css parametre, ktoré su v objekte budu vyanimované v podobe 2000ms + bounce animácia
			}, 'bounce');
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>animate()</strong> slúži na vyanimovanie css parametrov v danom časovom úseku<p>
			<p id="animations"><strong>Zoznam animácií: </strong> linear, sine, cosine, tan, wobble, circle, pulsate, expo, loop, bounce, swing (default), swingTo, swingToFrom </p>
		</div>
	</article>

	<article id="fadeIn">
		<h2>fadeIn(<span>duration</span>, <span>callback/animationType</span>, <span>animationType</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').fadeIn(1000); //Zobrazí element aj s animaciou, v čase 1 sekundy
			mq('#element').fadeIn(1000, 'swingToFrom'); //Zobrazí element aj s animaciou, v čase 1 sekundy, s typom animacie

			mq('#id').fadeIn(500, function(){
			    //Toto sa vykona keď sa dany element zobrazi
			});

			mq('#id').fadeIn(500, function(){
			    //...
			}, 'linear');
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>fadeIn()</strong> zobrazuje element s animáciou v danom časovom úseku.<p>
			<p>Pre <strong><a href="#animations" class="scroll">Zoznam animácií</a></strong> kliknite <a href="#animations" class="scroll">tu</a>.</p>
		</div>
	</article> 

	<article id="fadeOut">
		<h2>fadeOut(<span>duration</span>, <span>callback/animationType</span>, <span>animationType</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').fadeOut(1000); //Skryje element aj s animaciou, v čase 1 sekundy
			mq('#element').fadeOut(1000, 'circ'); // + linear

			mq('#id').fadeOut(500, function(){
			    //Toto sa vykona keď sa dany element skryje
			});			
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>fadeOut()</strong> skrýva element s animáciou v danom časovom úseku<p>
			<p>Pre <strong><a href="#animations" class="scroll">Zoznam animácií</a></strong> kliknite <a href="#animations" class="scroll">tu</a>.</p>
		</div>
	</article> 
	
	<article id="fadeToggle">
		<h2>fadeToggle(<span>duration</span>, <span>callback/animationType</span>, <span>animationType</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').fadeToggle(1000); //Skryje alebo zobrazi element podľa toho či už je zobrazeny v danom časovom úseku.
			mq('#element').fadeToggle(1000, 'bounce'); // + bounce

			mq('#id').fadeTogge(500, function(){
			    //Toto sa vykona keď sa dany element skryje/zobrazi
			});			
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>fadeToggle()</strong> skrýva, alebo zobrazuje element s animáciou v danom časovom úseku.<p>
			<p>Pre <strong><a href="#animations" class="scroll">Zoznam animácií</a></strong> kliknite <a href="#animations" class="scroll">tu</a>.</p>
		</div>
	</article> 
	<article id="slideUp">
		<h2>slideUp(<span>duration</span>, <span>callback/animationType</span>, <span>animationType</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').slideUp(1000); //Zasunie element aj s animaciou, v čase 1 sekundy
			mq('#element').slideUp(1000, 'swingToFrom'); //Zasunie element aj s animaciou, v čase 1 sekundy, s typom animacie

			mq('#id').slideUp(500, function(){
			    //Toto sa vykona keď sa dany element zasunie
			});

			mq('#id').slideUp(500, function(){
			    //...
			}, 'linear');
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>slideUp()</strong> zasuva element s animáciou v danom časovom úseku.<p>
			<p>Pre <strong><a href="#animations" class="scroll">Zoznam animácií</a></strong> kliknite <a href="#animations" class="scroll">tu</a>.</p>
		</div>
	</article> 

	<article id="slideDown">
		<h2>slideDown(<span>duration</span>, <span>callback/animationType</span>, <span>animationType</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').slideDown(1000); //Vysunie element aj s animaciou, v čase 1 sekundy
			mq('#element').slideDown(1000, 'circ'); // + linear

			mq('#id').slideDown(500, function(){
			    //Toto sa vykona keď sa dany element vysunie
			});			
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>slideDown()</strong> vysunie element s animáciou v danom časovom úseku<p>
			<p>Pre <strong><a href="#animations" class="scroll">Zoznam animácií</a></strong> kliknite <a href="#animations" class="scroll">tu</a>.</p>
		</div>
	</article> 
	
	<article id="slideToggle">
		<h2>slideToggle(<span>duration</span>, <span>callback/animationType</span>, <span>animationType</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#element').slideToggle(1000); //Vysunie alebo zasunie element podľa toho či už je zobrazeny v danom časovom úseku.
			mq('#element').slideToggle(1000, 'bounce'); // + bounce

			mq('#id').fadeTogge(500, function(){
			    //Toto sa vykona keď sa dany element vysunie/zasunie
			});			
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>slideToggle()</strong> zasúva, alebo vysúva element s animáciou v danom časovom úseku.<p>
			<p>Pre <strong><a href="#animations" class="scroll">Zoznam animácií</a></strong> kliknite <a href="#animations" class="scroll">tu</a>.</p>
		</div>
	</article> 

	<article id="click">
		<h2>click(<span>callback</span>, <span>removeEvent</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('a').click(function(){
			    this.fadeOut();
			    return false; //Zakaže presmerovanie
			}); //Po kliknuti na "a" element sa dany element skryje.

			mq('#id').click(function(){
			    this.fadeOut();
			    return false;
			}, true); //Po kliknuty sa dany element skryje, ale kliknutie plati len raz, pretože je druhy parameter true.

			mq('a').click(); //Vytvori falošný click event
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>click()</strong> vytvara event onclick, a zavola danu funkciu ak sa tento event vykona. Ak je druhý parameter true, tak sa dany event po vykonani automaticky zmaže.<p>
		</div>
	</article> 

	<article id="submit">
		<h2>submit(<span>callback</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('form').submit(function(){
				alert("Formulár sa odoslal...");
			    return false; //Zakaže presmerovanie
			}); //Po odoslani formulára sa vykona dana funkcia

			mq('form').submit() //Vytvori falošny submit event
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>submit()</strong> je fukncia ktorá sa používa pri formulároch, kde pri odoslani vytvara event onsubmit, a zavola danu funkciu ak sa tento event vykona.<p>
		</div>
	</article>

	<article id="on">
		<h2>on(<span>event</span>, <span>callback/element</span>, <span>callback/removeEvent</span>, <span>removeEvent</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('a').on('click', function(e){ //Vytvori event onclick
			    console.log(e);
			});

			mq('select').on('change', function(e){ //Vytvori event onchange
			    var value = this.val();
			    console.log(value); //Vyberie danu hodnotu zo selektu
			});

			mq('body').on('click', '.class', function(){
			    //Vytvori sa event pre kliknutie na body, pri ktorom sa callback spusti len pri kliknuti na dany element.
			});
			//A tak ďalej...
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>on()</strong> vytvara eventlistenery pre dany element, alebo pre rodiča v ktorom sa dany element môže, alebo nemusí nachadzať, ak je posledný parameter true tak bude pri vykonani callbacku listener automaticky zmazaný</p>
			<p><strong>Zoznam listenerov:</strong> <a href="http://www.w3schools.com/jsref/dom_obj_event.asp" target="_blank">http://www.w3schools.com/jsref/dom_obj_event.asp</a></p>
		</div>
	</article> 

	<article id="html">
		<h2>html(<span>string</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('#class').html('<div>Toto je môj nový element!</div>'); //V elemente ".class" bude zmeneny obsah html na danu hodnotu.
			mq('#class').html(); //Vyberie html z daneho elementu
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>html()</strong> vklada html obsah do daneho elementu, ak nie je vloženy obsah tak funkcia vráti obsah elementu.<p>
		</div>
	</article>

	<article id="val">
		<h2>val(<span>string</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('input').val('hodnota'); //V inpute sa zmeni hodnota na vloženy parameter
			mq('input').val(); //Vráti hodnotu z daneho inputu
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>val()</strong> vklada hodnotu do inputu, alebo ju vracia, podľa vloženého parametra.<p>
		</div>
	</article> 

	<article id="focus">
		<h2>focus()</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('input').focus() //Označi dany element
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>focus()</strong> slúži na označenie daneho elementu.<p>
		</div>
	</article> 

	<article id="clone">
		<h2>clone()</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			var mq('.class').clone(); //Element bude odklonovaný
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>clone()</strong> vytvara presný klon elementu.</p>
		</div>
	</article> 

	<article id="merge">
		<h2>merge()</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('div').merge('a'); //K vybraným "div" elementom prida všetky "a" elementy

			var divs = mq('div');
			mq('a').merge(divs); //K všetkym vybraným "a" elementom, prida už vybrane "div" elementy
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>merge()</strong> prida už do vybraných elementov cez myquery ďalšie lementy, alebo ulúči dva myQuery objekty.</p>
		</div>
	</article> 

	<article id="append">
		<h2>append(<span>element/string</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('body').append('<div>Ahoj Svet!</div>'); //Na koniec daneho elementu sa vložy element alebo obsah ktorý
			bol vloženy do parametra.
			
			var element = mq('.class');
			mq('body').append(element); //Na koniec elementu vloži ďalší už existujúci element;
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>append()</strong> vklada obsah, alebo element na koniec daneho elementu.<p>
		</div>
	</article>

	<article id="prepend">
		<h2>prepend(<span>element/string</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('body').prepend('<div>Ahoj Svet!</div>'); //Na začiatok daneho elementu sa vložy element alebo obsah ktorý
			bol vloženy do parametra.
			
			var element = mq('.class');
			mq('body').prepend(element); //Na začiatok elementu vloži ďalší už existujúci element;
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>prepend()</strong> vklada obsah, alebo element na začiatok daneho elementu.<p>
		</div>
	</article>  

	<article id="sendForm">
		<h2>sendForm(<span>action</span>, <span>callback</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq('form').submit(function(){

			    //Jednoduchý callback
			    this.sendForm('/adresa/', function(e){ //Tato funkcia spracuje a odošle celý formular cez ajax
			        var html = e.response;
			        console.log(e);
			    });

			    //Callback v podobe objektu
			    this.sendForm('/adresa/', { 
			        success : function(e) {  },
			        progress : function(e) { 
			            console.log(e+'%') 
			        }, // Vráti na koľko % je formulár odoslany, výhodne pri veľkom prenose dát.
			        error : function(e){
			            //Vráti chybu pri requeste
			        }
			    });

			});
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>sendForm()</strong> Sa postara o rýchle a jednoduche spracovanie celeho formulára vratane súborov, a všetko zabezpečí za Vás, po odoslani bude vrateny výsledok zo servera.<p>
			<br>
			<p><strong>1.</strong> Adresa môze zostať aj prázdna a formular bude odoslany na adresu na ktorej sa práve nachádza.</p>
			<p><strong>2.</strong> Funkcia automaticky rozhoduje či sa jedna o GET, alebo POST podľa toho ako ja parameter nastavený vo formulári. (Default je GET)</p>
		</div>
	</article>  	

	<article id="ajax">
		<h2>mq.ajax(<span>action</span>, <span>data/callback</span>, <span>callback</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			//POST - bez súborov
			mq.ajax('/adresa/', { 'meno' : 'Jan Novák', 'heslo' : 12345 }, function(e){
			    var html = e.response;
			    console.log(response);
			});

			//POST so súbormi
			mq.ajax('adresa', { 'files' : [file1, file2, file3], 'datum' : 'xx.xx.xx' }, { 
			    success : function(e) {  },
			    progress : function(e) { 
			        console.log(e+'%') 
			    }, // Vráti na koľko % je formulár odoslany, výhodne pri veľkom prenose dát.
			    error : function(e){
			            //Vráti chybu pri requeste
			    }
			});

			//GET
			mq.ajax('/adresa/?value=1&meno=Marek', function(e){
			    console.log(e);
			});
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>ajax()</strong> sa postara o jednoduchy requiest pri ktorom automaticky rozhodne či sa jedno a GET, alebo POST podľa toho či su vložene dáta.</p>
		</div>
	</article> 

	<article id="mqmerge">
		<h2>mq.merge(<span>object/array</span>, <span>object/array</span>, <span>length</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq.merge({ a : 'a', 'b' : 'b' }, { c : 'c', 'd' : 'd' }); // Vráti { a : 'a', 'b' : 'b', c : 'c', 'd' : 'd' }
			mq.merge({ a : 'a', 'b' : 'b' }, { c : 'c', 'd' : 'd' }, true); // Vráti {a: 'a', b: 'b', c: 'c', d: 'd', length: 4}
			mq.merge(['a', 'b'], ['c', 'd']) // Vráti ['a', 'b', 'c', 'd']
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>mq.merge()</strong> zlúči polia do jedneheho poľa, alebo zlúčuje objekty. Ak sa jedna o objekt, a treti parameter length bude true, tak v objekte bude vratena hodnota dlžky objektu.</p>
		</div>
	</article> 

	<article id="browser">
		<h2>mq.browser</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			var browser = mq.browser;

			browser.name; //Vráti nazov browseru
			browser.version; //Vráti verziu browseru, ak sa jedna o Internet Explorer
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>objekt <strong>mq.browser()</strong> slúži na jednoduche rozpoznanie prowseru</p>
		</div>
	</article> 

	<article id="mqisemail">
		<h2>mq.is.email(<span>email</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq.is.email('email@email.com') //Vraťi true
			mq.is.email('emal\/.$.com') //vrati false
			mq.is.email('ahoj.sk') //false
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>mq.is.email</strong> vracia true, alebo false, podľa toho či ja hodnota vo formate emailu.</p>
		</div>
	</article> 

	<article id="mqisnimeric">
		<h2>mq.is.numeric(<span>number</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq.is.numeric(5) //true
			mq.is.numeric('dada') //false
			mq.is.numeric(0) //true
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>mq.is.numeric</strong> vracia true, alebo false, podľa toho či je hodnota vo forme čísla.</p>
		</div>
	</article>

	<article id="mqisobject">
		<h2>mq.is.object(<span>object</span>)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq.is.object({}) //true
			mq.is.object(document.getElementsById('id')) //false
			mq.is.object(0) //false
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>funkcia <strong>mq.is.object</strong> vracia true, alebo false, podľa toho či je hodnota vo forme objektu, funkcia je vhodne pre staršie browsery ktore nemusia vraciať správny typeof.</p>
		</div>
	</article>

	<article id="tvorba-fukncii">
		<h2>Tvorba vlastných funkcií (pluginov)</h2>
		
		<div class="area">
			<div class="lines"></div>
			<textarea readonly spellcheck="false">
			mq.fn.tancuj = function(text){
			    return this.each(function(){ //Prebehňu sa všetky elementy pre ktore sa vykona dana funkcia
			        
			        this.fadeOut(1000, function(){
			            this.fadeIn(1000);
			        });
			        this.html('Tancujeeem!'+text);

			    });
			}

			mq('a').tancuj('Teraz'); //Funkcia sa zavola
			</textarea>
		</div>
		<div class="info">
			<span>-</span><p>Nová funkcia sa vytvara pomocou <strong>mq.fn.nazov</strong>, ktorá bude platiť pre celý objekt myQuery.</p>
		</div>
	</article> 
</nav>
<nav>
	<h2 class="title">Predchádzajúce verzie:</h2>
	<p>Predchádzajúce verzie nie je odporučené sťahovať, pretože nemusia obsahovať niektoré funkcie, alebo sú chybné.</p>
	<?php 
	foreach ($files as $file) {
		if (substr($file, 0, 7)=='myQuery')
			echo '<p><a href="js/'.$file.'">'.$file.'</a> <small>('.substr(filesize('js/'.$file)/1000, 0, 4).'kb)</small></p>';
	}
	?>
</nav>
<footer><strong>Copyright &copy; 2014</strong> - Marek Gogoľ - myQuery library</footer>

<a href="#top" id="goTop" class="scroll"></a>
</body>
</html>