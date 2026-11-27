"use strict";
// Curated quiz starters. Sources are linked per combo. No client-side Scryfall API calls.
const C=[
 {cards:["Kinnan, Bonder Prodigy","Basalt Monolith"],answer:"Basalt Monolith",result:"無限無色マナ",condition:"キナンと玄武岩のモノリスをコントロール。モノリスをタップするとキナンにより無色4マナを生み、3マナでアンタップできる。",source:"https://commanderspellbook.com/combo/129-4131/",level:"初級"},
 {cards:["Siona, Captain of the Pyleas","Shielded by Faith"],answer:"Shielded by Faith",result:"無限のクリーチャー・トークン",condition:"シオーナをコントロールし、自分のクリーチャーに信仰の守りをつける。トークンが戦場に出るたびに守りをそのトークンへ付け替え、シオーナで次のトークンを作る。",source:"https://commanderspellbook.com/combo/432-1687/",level:"初級"},
 {cards:["Niv-Mizzet, Parun","Curiosity"],answer:"Curiosity",result:"大量のカードドローとダメージ（ライブラリー枚数まで）",condition:"ニヴ＝ミゼットに好奇心をつけ、カードを引くか、ニヴ＝ミゼットが対戦相手にダメージを与えるところから始める。好奇心のドローは任意なので途中で止められる。",source:"https://commanderspellbook.com/combo/1089-2353/",level:"初級"},
 {cards:["Heliod, Sun-Crowned","Walking Ballista"],answer:"Walking Ballista",result:"任意回数のダメージ",condition:"歩行バリスタに+1/+1カウンターが2個以上あり、ヘリオッドの起動能力で絆魂を与えられること。対戦相手へのダメージとライフ獲得でカウンターを補充する。",source:"https://commanderspellbook.com/combo/1274-3693/",level:"初級"},
 {cards:["Godo, Bandit Warlord","Helm of the Host"],answer:"Helm of the Host",result:"追加戦闘フェイズの反復",condition:"多勢の兜をゴドーに装備し、戦闘開始時に非伝説のゴドーのコピーを生成する。コピーの攻撃誘発により追加戦闘を得る。攻撃可能な状態が必要。",source:"https://commanderspellbook.com/combo/1692-4251/",level:"初級"},
 {cards:["Malcolm, Keen-Eyed Navigator","Glint-Horn Buccaneer"],answer:"Glint-Horn Buccaneer",result:"各対戦相手への反復ダメージ",condition:"攻撃中の《光り角の海賊》の能力を起動するため、最初に{1}{R}と捨てる手札1枚が必要。2人以上の対戦相手にダメージが通れば、マルコムが作る宝物で次の起動コストをまかなえる。対戦相手が1人になると宝物は1つしか出ないので、続けるには貯めた宝物などが必要。",source:"https://commanderspellbook.com/combo/4508-4869/",level:"中級"},
 {cards:["Chatterfang, Squirrel General","Pitiless Plunderer","Ashnod's Altar"],answer:"Ashnod's Altar",result:"無限の無色マナと死亡誘発",condition:"リストの3枚をコントロールし、最初に生け贄にできるリスが1体必要。リスを供犠台で生け贄にすると宝物と新しいリスが生まれる。",source:"https://commanderspellbook.com/search/?q=Chatterfang%2C+Squirrel+General+Pitiless+Plunderer+Ashnod%27s+Altar",level:"中級"},
 {cards:["Chatterfang, Squirrel General","Pitiless Plunderer","Viscera Seer"],answer:"Viscera Seer",result:"無限の占術と死亡誘発",condition:"最初のリス1体と3枚のパーツが必要。臓物の予見者で生け贄→宝物生成→サワギバによるリス生成を繰り返す。",source:"https://commanderspellbook.com/search/?q=Chatterfang%2C+Squirrel+General+Pitiless+Plunderer+Viscera+Seer",level:"中級"},
 {cards:["Chatterfang, Squirrel General","Pitiless Plunderer","Viscera Seer","Blood Artist"],answer:"Blood Artist",result:"死亡誘発で対戦相手のライフを任意の回数失わせ、自分はライフを得る",condition:"サワギバ、略奪者、予見者、血の芸術家をコントロールし、リス1体から開始する。生け贄ループで血の芸術家が誘発する。",source:"https://commanderspellbook.com/search/?q=Chatterfang+Pitiless+Plunderer+Viscera+Seer+Blood+Artist",level:"上級"},
 {cards:["Chatterfang, Squirrel General","Pitiless Plunderer","Ashnod's Altar","Blood Artist"],answer:"Blood Artist",result:"無限の無色マナを得ながら、死亡誘発で対戦相手のライフを失わせ、自分はライフを得る",condition:"4枚と最初のリス1体が必要。供儀台でリスを生け贄にし、宝物とリスを補充。血の芸術家が死亡を勝ち筋に変える。",source:"https://commanderspellbook.com/search/?q=Chatterfang+Pitiless+Plunderer+Ashnod%27s+Altar+Blood+Artist",level:"上級"}
];
// Curated near-misses. These explanations appear only after grading.
const decoys={
 "Basalt Monolith": {
  "Grim Monolith": "キナン込みで4マナ出ても、アンタップにも4マナかかるため、増えません。",
  "Mana Vault": "自力でアンタップできるのはアップキープの開始時だけで、好きな回数は繰り返せません。",
  "Thran Dynamo": "キナンで加速できますが、これ自身をアンタップする能力がありません。"
 },
 "Shielded by Faith": {
  "Flickerform": "付け直しには毎回マナが必要で、追放したカードが戻るのも終了ステップです。",
  "Gift of Immortality": "クリーチャーが死亡しないと動かず、オーラが戻るのも終了ステップです。",
  "Unquestioned Authority": "付けたときのドローは戦場に出たときだけ。新しいトークンへ移る能力はありません。"
 },
 "Curiosity": {
  "Curious Obsession": "カードを引けるのは戦闘ダメージだけ。ニヴ＝ミゼットの誘発型能力の1点では引けません。",
  "Combat Research": "カードを引けるのは戦闘ダメージだけ。ニヴ＝ミゼットの誘発型能力の1点では引けません。",
  "Security Bypass": "謀議が起こるのは戦闘ダメージだけ。誘発型能力の1点で連鎖しません。"
 },
 "Walking Ballista": {
  "Hangarback Walker": "カウンターを貯められますが、取り除いてダメージを与える能力はありません。",
  "Stonecoil Serpent": "カウンターで大きくなりますが、カウンターをダメージに変える能力はありません。",
  "Crystalline Crawler": "カウンターを取り除いて生まれるのはマナで、ダメージではありません。"
 },
 "Helm of the Host": {
  "Blade of Selves": "無尽のコピーは攻撃している状態で出るため、「攻撃するたび」は誘発しません。",
  "Mimic Vat": "速攻を持つコピーを作れますが、ゴドーを先に刻印する必要があり、コピーも伝説のままです。起動にも毎回3マナかかります。",
  "Sword of Hearth and Home": "ゴドーを明滅できますが、戻ったゴドーには速攻がなく、次の戦闘で攻撃できません。"
 },
 "Glint-Horn Buccaneer": {
  "Breeches, Brazen Plunderer": "海賊がダメージを与えた後にカードを追放しますが、自分で繰り返しダメージを出せません。",
  "Captain Lannery Storm": "攻撃時に宝物が出ても、手札を捨てて各対戦相手にダメージを与える能力はありません。",
  "Breeches, Eager Pillager": "攻撃誘発の各モードは各ターン1回までで、全員へのダメージを反復できません。"
 },
 "Ashnod's Altar": {
  "Phyrexian Altar": "生け贄で繰り返し出せるのは色マナだけ。「好きな色」に無色は含まれません。",
  "Altar of Dementia": "生け贄で切削は繰り返せますが、無色マナは出ません。",
  "Spawning Pit": "生け贄で貯まるのは蓄積カウンターで、無色マナは出ません。"
 },
 "Viscera Seer": {
  "Carrion Feeder": "生け贄で得られるのは＋1/＋1カウンターで、占術ではありません。",
  "Nantuko Husk": "生け贄で得られるのはターン終了時までの強化で、占術ではありません。",
  "Dockside Chef": "生け贄でできるのはドローで、占術ではありません。起動にも2マナが必要です。"
 },
 "Blood Artist": {
  "Poison-Tip Archer": "対戦相手のライフは減りますが、自分のライフは増えません。",
  "Deathgreeter": "自分のライフは増えますが、対戦相手のライフは減りません。",
  "Grim Haruspex": "トークンの死亡では誘発せず、そもそも得られるのはドローです。"
 },
 "Blood Artist (mana)": {
  "Poison-Tip Archer": "対戦相手のライフは減りますが、自分のライフは増えません。",
  "Deathgreeter": "自分のライフは増えますが、対戦相手のライフは減りません。",
  "Morbid Opportunist": "死亡で得られるのは各ターン1回のドローで、ライフの増減ではありません。"
 }
};
const decoyKey=q=>q.answer==="Blood Artist"&&q.cards.includes("Ashnod's Altar")?"Blood Artist (mana)":q.answer;
const $=id=>document.getElementById(id);
function shuffle(items){
 const shuffled=[...items];
 for(let i=shuffled.length-1;i>0;i--){
  const j=Math.floor(Math.random()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
 }
 return shuffled;
}
const ZONE_NAMES={B:"戦場",H:"手札",G:"墓地",E:"追放領域",C:"統率領域",L:"ライブラリー",S:"スタック"};
const CORE_START=[
 ["キナンと［空欄］が戦場にあり、［空欄］はアンタップ状態。"],
 ["シオーナが戦場にいて、［空欄］をつけられる自分のクリーチャーがいる。"],
 ["［空欄］がニヴ＝ミゼットについている。最初のドローか、ニヴから対戦相手へのダメージを起こせる。"],
 ["ヘリオッドと［空欄］が戦場にあり、［空欄］には＋1/＋1カウンターが2個以上。{1}{W}を使える。"],
 ["［空欄］を装備したゴドーが戦場にいる。自分の戦闘開始時で、新しく出るトークンが攻撃できる。"],
 ["マルコムが戦場にいて、［空欄］で攻撃中。{1}{R}、捨てられる手札1枚、引けるカードが必要。対戦相手が2人以上いてダメージを与えられる。"],
 ...Array.from({length:4},()=>["すべてのパーツが戦場にあり、ほかに生け贄にできるリスが1体いる。"])
];
// Hand-written start states never use the hidden card's name or the answer source URL.
function getStartConditions(q){return CORE_START[Number(q.id.slice(5))];}
function renderStartConditions(q){
 const box=$("start-conditions");box.replaceChildren();
 list(box,q.startConditions??[]);
}

const wordsJP={W:"白",U:"青",B:"黒",R:"赤",G:"緑",C:"無色"};
const colorName=i=>i==="C"?"無色":[...i].map(c=>wordsJP[c]).join("");
const colorOrder="WUBRG";
const orderColor=x=>[...colorOrder].filter(c=>x.includes(c)).join("")||"C";
const CORE_GUIDES=[
 [["キナンと玄武岩のモノリスが戦場にあり、モノリスがアンタップ状態。"],["モノリスをタップして無色3マナを出す。キナンで同じ種類のマナが1点増え、合計4点になる。","うち3マナを払ってモノリス自身のアンタップ能力を起動する。"],"元の状態に戻り、手元には無色1マナが残る。繰り返すたびに1マナずつ増える。"],
 [["シオーナと、信仰の守りをつけられる自分のクリーチャーが必要。"],["信仰の守りが自分のクリーチャーにつくとシオーナが誘発し、兵士トークンが出る。","新しい兵士が戦場に出たので、信仰の守り自身の能力でその兵士に付け替える。","付け替えによってシオーナが再び誘発する。"],"兵士が出るたびにオーラを付け替え、次の兵士が出る。オーラの付け替えは任意なので止められる。"],
 [["好奇心がニヴ＝ミゼットについていて、最初にカードを引くかニヴで対戦相手にダメージを与えられる。"],["カードを引くとニヴの能力が誘発する。対戦相手に1点を与える。","好奇心が誘発し、カードを1枚引くことを選べる。","カードを引いたのでニヴがもう一度誘発する。"],"ダメージとドローが互いを誘発させる。ドローは任意で、ライブラリーを引き切る前に止められる。"],
 [["ヘリオッドと、＋1/＋1カウンターが2個以上乗った歩行バリスタをコントロールしている。ヘリオッドの能力に白を含む2マナが必要。"],["ヘリオッドでバリスタにターン終了時まで絆魂を与える。","バリスタのカウンターを1個外し、対戦相手に1点を与える。絆魂で1点のライフを得る。","ヘリオッドが誘発するので、その＋1/＋1カウンターをバリスタに置く。"],"使ったカウンターが戻るので、ダメージとライフ獲得を任意の回数繰り返せる。"],
 [["多勢の兜をゴドーに装備し、自分の戦闘開始ステップに進む。コピーが攻撃できる状態にする。"],["戦闘開始時、兜が速攻を持つ非伝説のゴドーのコピーを作る。","新しいコピーで攻撃すると、そのコピーにとってこのターン最初の攻撃なので、ゴドーの能力で追加戦闘を得る。","追加戦闘の開始時に兜がさらに新しいゴドーのコピーを作る。"],"毎回、新しいコピーが最初の攻撃を行える。対戦相手が妨害しなければ追加戦闘を繰り返せる。"],
 [["マルコムをコントロールし、光り角の海賊で攻撃する。初回の起動に赤を含む2マナと捨てる手札1枚が必要。"],["攻撃中に海賊の能力を起動し、手札を1枚捨てる。","捨てたことで各対戦相手に1点。海賊のダメージを受けた対戦相手の人数分、マルコムで宝物を作る。","起動した能力で1枚引き、宝物で次の起動を支払う。"],"少なくとも2人に毎回ダメージが通れば、次の起動分の宝物と捨てる手札を補える。対戦相手が1人になると、貯めた宝物などが必要。ドローできる枚数にも注意。"],
 [["サワギバ、無慈悲な略奪者、アシュノッドの供犠台が戦場にあり、生け贄にできるリスが1体いる。"],["リスを供犠台に生け贄に捧げ、無色2マナを出す。","死亡で無慈悲な略奪者が誘発し、宝物を作る。サワギバの置換効果で、同時にリスも1体作る。"],"次に使うリスが補充され、無色2マナと宝物が残る。繰り返して無色マナと死亡誘発を増やせる。"],
 [["サワギバ、無慈悲な略奪者、臓物の予見者が戦場にあり、生け贄にできるリスが1体いる。"],["予見者のコストとしてリスを生け贄に捧げる。","死亡で略奪者が誘発。宝物を作る際にサワギバの置換効果でリスも作る。","予見者の能力を解決して占術1を行う。"],"次のリスが戻るので、マナを支払わずに占術1と死亡誘発を繰り返せる。"],
 [["サワギバ、無慈悲な略奪者、臓物の予見者、血の芸術家が戦場にあり、生け贄にできるリスが1体いる。"],["予見者のコストとしてリスを生け贄にする。","略奪者が作る宝物にサワギバの置換効果でリスが加わる。","血の芸術家の死亡誘発で、対象の対戦相手が1点のライフを失い、自分は1点を得る。予見者は占術1。"],"生け贄にしたリスが毎回補充されるので、死亡誘発で対戦相手のライフを削れる。"],
 [["サワギバ、無慈悲な略奪者、アシュノッドの供犠台、血の芸術家が戦場にあり、生け贄にできるリスが1体いる。"],["リスを供犠台に生け贄にして無色2マナを出す。","略奪者の誘発で宝物が出る際、サワギバの置換効果で新しいリスも出る。","血の芸術家の誘発で対象の対戦相手が1点のライフを失い、自分は1点を得る。"],"リスが補充されるたびに、ライフを削りながら無色マナを貯められる。"]
];
const POPULAR_GUIDES={
"690-3966":[["血なまぐさい結合と極上の血が戦場にあり、最初にライフを得る手段がある。"],["ライフを得ると血なまぐさい結合が誘発。対象の対戦相手がその点数分のライフを失う。","対戦相手がライフを失ったので極上の血が誘発。自分が同じ点数のライフを得る。","新たにライフを得たので、血なまぐさい結合が再び誘発する。"],"ライフ獲得とライフ損失が互いを誘発する。どちらも任意ではない。"],
"1295-3093":[["両方が手札にあり、合計で{1}{U}{U}{B}を支払える。ライブラリーに同名カードが残っていない。"],["汚れた契約を唱え、カードを手札に加えずにライブラリーをすべて追放する。","タッサの神託者を唱え、戦場に出たときの能力を解決する。"],"能力の解決時に青への信心がライブラリーの枚数以上なら勝利。ライブラリーが0枚なら信心0でも条件を満たす。"],
"4821-5261":[["劇的な逆転が等時の王笏に刻印されている。土地でない自分のパーマネントがタップで合計3マナ以上を出せる。"],["土地でないパーマネントからマナを出す。","2マナを払って王笏をタップ。刻印した劇的な逆転のコピーを唱える。","劇的な逆転で王笏とマナを出したパーマネントをアンタップする。"],"初期状態に戻るたび、3マナ以上の収入から2マナを払った差が残る。"],
"2577-4050":[["墓所這いとファイレクシアの供犠台が戦場にあり、墓所這いとは別のゾンビをコントロールしている。"],["墓所這いを供犠台に生け贄にし、黒マナ1点を出す。","別のゾンビがいるので、黒マナ1点で墓地の墓所這いを唱える。"],"盤面が戻るため、死亡・戦場に出ること・呪文を唱えることを繰り返せる。黒マナは増えない。"],
"147-1235":[["双つ身の炎と二重詠唱の魔道士が手札にあり、双つ身の炎の最初の対象になる自分のクリーチャーがいる。両方を唱えられるマナが必要。"],["双つ身の炎を唱える。解決前に優先権を保持し、二重詠唱の魔道士を唱える。","魔道士の戦場に出たときの能力で、スタック上の双つ身の炎をコピーし、魔道士を対象にする。","コピーを解決すると、魔道士の速攻持ちトークンが出る。新しい魔道士で元の双つ身の炎をまたコピーする。"],"元の呪文を解決させる前にコピーが次の魔道士を作る。必要な数になったら、次のコピーで魔道士ではなく最初のクリーチャーを対象にして止める。"],
"4131-4547":[["玄武岩のモノリスと見捨てられた碑が戦場にあり、モノリスがアンタップ状態。"],["モノリスをタップすると無色3マナ。碑が誘発し、さらに無色1マナを加える。","無色3マナを払ってモノリスのアンタップ能力を起動する。"],"無色1マナが残り、モノリスが起きる。1周につき無色マナ1点ずつ増える。"],
"1580-2034-4871":[["無慈悲な略奪者、アシュノッドの供犠台、組み直しの骸骨が戦場にある。"],["骸骨を供犠台に生け贄にして無色2マナ。略奪者で宝物を1つ作る。","その宝物を生け贄にして黒マナを出す。","無色1点と黒1点で、骸骨を墓地から戦場にタップ状態で戻す。"],"供犠台はタップを要求しないので戻った骸骨をすぐ使える。1周につき無色1マナが残る。"],
"936-1290":[["血の長の昇天と精神クランクが戦場にあり、昇天に探索カウンターが3個以上乗っている。対戦相手にライフを失わせるきっかけが必要。"],["対戦相手がライフを失うと精神クランクが誘発し、その点数分を切削する。","切削で対戦相手の墓地にカードが置かれるたび、昇天が誘発。選べば対戦相手は2点のライフを失い、自分は2点を得る。","ライフ損失で精神クランクがまた誘発する。"],"切削とライフ損失が連鎖する。昇天のライフ損失は任意で、ライブラリーやライフの残りで連鎖の長さが変わる。"],
"1558-1977":[["ティヴィットと時の篩が戦場にあり、対戦相手が3人以上。ティヴィットが戦闘ダメージを通せる。"],["ティヴィットで対戦相手に戦闘ダメージを与える。投票で手掛かりか宝物を、合計5個以上作る。","時の篩をタップし、アーティファクトを5つ生け贄にして追加ターンを得る。","追加ターンにティヴィットで再び戦闘ダメージを与える。"],"各戦闘で次の追加ターンのコストを補える。対戦相手が2人以下になると、通常この2枚だけでは5個作れない。"]
};

const curatedColors=["UG","WG","UR","W","R","UR","BG","BG","BG","BG"];
C.forEach((q,i)=>{q.color=orderColor(curatedColors[i]);q.id="core-"+i;q.guide=CORE_GUIDES[i];q.decks=null;q.startConditions=getStartConditions(q);});
const key=names=>JSON.stringify([...names].sort());
const curatedKeys=new Set(C.map(q=>key(q.cards)));
let legacyMap={};
let expanded=null,bankLoad=null,loadFailed=false,deck=[],at=0,score=0,locked=false;
let selectedColor="all",selectedGenre="all";
let roundWrong=new Set(),playingReview=false;
const REVIEW_KEY="commander-combo-quiz:missed:v2";
const SEEN_KEY="commander-combo-quiz:seen:v1";
const LEGACY_KEY="commander-combo-quiz:missed:v1";
const reviewKey=q=>q.draft?"draft:"+q.id+":"+q.answer.replace(/^draft:/,""):
 "core:"+JSON.stringify([q.answer,...q.cards.filter(n=>n!==q.answer).sort()]);
let canStore=true,legacyReview=[];
const missed=new Set(),seen=new Set();
try{
 const v2=localStorage.getItem(REVIEW_KEY);
 const saved=JSON.parse(v2||"[]");
 const previous=JSON.parse(localStorage.getItem(SEEN_KEY)||"[]");
 if(Array.isArray(previous))for(const id of previous)if(typeof id==="string")seen.add(id);
 if(Array.isArray(saved))for(const id of saved)if(typeof id==="string"){missed.add(id);seen.add(id);}
 if(v2===null||v2===undefined){
  const old=JSON.parse(localStorage.getItem(LEGACY_KEY)||"[]");
  if(Array.isArray(old))legacyReview=old.filter(x=>typeof x==="string");
 }
}catch{canStore=false;}
function saveMissed(){
 try{localStorage.setItem(REVIEW_KEY,JSON.stringify([...missed]));}
 catch{canStore=false;}
}
function saveSeen(){
 try{localStorage.setItem(SEEN_KEY,JSON.stringify([...seen]));}
 catch{canStore=false;}
}
function markSeen(q){
 const identity=reviewKey(q);
 if(!seen.has(identity)){seen.add(identity);saveSeen();}
}
function unseenFirst(pool){
 const fresh=[],familiar=[];
 for(const q of pool)(seen.has(reviewKey(q))?familiar:fresh).push(q);
 return [...shuffle(fresh).slice(0,10),...shuffle(familiar).slice(0,Math.max(0,10-fresh.length))];
}
function migrateLegacy(map){
 if(!legacyReview.length)return;
 // The v1 mapping is tied to the last release that used v1, not the next updated bank.
 const active=new Set(completePool().map(reviewKey));
 for(const old of legacyReview)if(Object.hasOwn(map,old)&&active.has(map[old])){missed.add(map[old]);seen.add(map[old]);}
 legacyReview=[];
 saveMissed();saveSeen();
}
function readReview(text){
 const data=JSON.parse(text);
 const valid=rows=>Array.isArray(rows)&&rows.length<=50000&&rows.every(x=>typeof x==="string"&&x.length<=1000);
 if(!data||data.format!=="commander-combo-quiz-review"||data.version!==2||!valid(data.questions)||(data.seen!==undefined&&!valid(data.seen)))throw Error("Invalid review");
 const available=new Set(completePool().map(reviewKey));
 const unknown=new Set();
 let added=0,addedSeen=0;
 for(const k of new Set(data.questions)){
  if(!available.has(k))unknown.add(k);
  else if(!missed.has(k)){missed.add(k);added++;}
 }
 for(const k of new Set([...(data.seen??[]),...data.questions])){
  if(!available.has(k))unknown.add(k);
  else if(!seen.has(k)){seen.add(k);addedSeen++;}
 }
 saveMissed();saveSeen();syncCounts();
 return {added,addedSeen,unavailable:unknown.size};
}
async function importReview(ev){
 const input=ev.currentTarget,file=input.files?.[0];
 if(!file)return;
 try{
  if(file.size>4*1024*1024)throw Error("Too large");
  const result=readReview(await file.text());
  $("review-status").textContent="復習リストに"+result.added+"問、出題履歴に"+result.addedSeen+"問追加しました。"+(result.unavailable?" この版になかった問題："+result.unavailable+"問。":"");
 }catch{$("review-status").textContent="復習リストを読み込めませんでした。保存したJSONファイルを選んでください。";}
 finally{input.value="";}
}
const genres=["all","popular","rare"];
function pickGenre(value){
 selectedGenre=value;
 for(const tag of genres)$("genre-"+tag).setAttribute("aria-pressed",String(tag===value));
 syncCounts();
}
const completePool=()=>[...C,...(expanded??[])];
function reviewCandidates(ids=missed){return completePool().filter(q=>ids.has(reviewKey(q)));}
function syncReview(){
 const n=reviewCandidates().filter(q=>q.startConditions).length;
 $("review-start").textContent="復習する（"+n.toLocaleString("ja-JP")+"問）";
 $("review-start").disabled=n===0;
 $("review-import").disabled=!expanded;
 const paused=reviewCandidates().length-n;
 $("review-note").textContent=(canStore?"間違えた問題を、色に関係なくこのブラウザで復習できます。":"ブラウザに保存できない場合は、このタブを閉じるまで復習できます。")+
  (paused?" この版で出題対象外の"+paused+"問も、履歴には残ります。":"");
 const recent=reviewCandidates(roundWrong).filter(q=>q.startConditions).length;
 $("review-now").hidden=recent===0;
 $("review-now").textContent="間違えた問題を復習（"+recent+"問）";
}
const colorValue=()=>selectedColor;
const choicesColor=[...colorOrder,"C","all"];
function paintColor(){
 for(const c of choicesColor)$("pick-"+c).setAttribute("aria-pressed",String(c==="C"||c==="all"?selectedColor===c:selectedColor!=="all"&&selectedColor.includes(c)));
 $("colorPattern").textContent=selectedColor==="all"?"全部混ぜる":colorName(selectedColor);
 $("app").dataset.pattern=selectedColor;
}
function pickColor(c){
 if(c==="C"||c==="all")selectedColor=c;
 else{
  const active=new Set(selectedColor==="C"||selectedColor==="all"?[]:[...selectedColor]);
  if(active.has(c))active.delete(c);else active.add(c);
  selectedColor=active.size?orderColor([...active]):"all";
 }
 paintColor();syncCounts();
}
async function loadBank(){
 if(typeof DecompressionStream!=="function")throw Error("Use a current browser");
 const bytes=Uint8Array.from(atob(PUBLIC_BETA_PAYLOAD),c=>c.charCodeAt(0));
 const [count,migration,cards,questions]=await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"))).json();
 if(questions.length!==60272)throw Error("Incomplete beta bank");
 C.forEach((q,i)=>{q.decks=count[i]??null;});
 legacyMap=migration;
 const ids=n=>"draft:"+n;
 for(const [id,name,english,images,en] of cards){
  CARD_DATA[ids(id)]={name,english,ja:images[0],extraJA:images.slice(1),en,printed:true};
 }
 return questions.map(([id,known,answer,options,result,color,decks,startConditions,stepsJP,ruleAudit])=>({
  id, cards:[...known,answer].map(ids), answer:ids(answer), options:options.map(ids), draft:true,
  result:ruleAudit?.result??result.join("／"), source:"https://commanderspellbook.com/combo/"+id+"/",
  color, decks, startConditions, stepsJP, guide:POPULAR_GUIDES[id], ruleAudit
 }));
}
function filteredQuestions(){
 return completePool().filter(q=>q.startConditions&&(colorValue()==="all"||q.color===colorValue())&&
  (selectedGenre==="all"||(Number.isInteger(q.decks)&&(selectedGenre==="popular"?q.decks>=1000:q.decks<1000))));
}
function syncCounts(){
 const filtered=filteredQuestions();
 const available=filtered.length;
 const ready=!!expanded||loadFailed;
 $("start").disabled=!ready||available===0;
 $("available").textContent=!ready?"問題データを読み込み中…":available?(loadFailed?"試作データを読み込めなかったため、確認済みのみ。":"")+"出題できる問題："+available.toLocaleString("ja-JP")+"問":"この色と傾向に合う問題はまだありません。";
 const seenCount=filtered.reduce((n,q)=>n+Number(seen.has(reviewKey(q))),0);
 $("progress-summary").textContent=ready&&available?"この条件で出題済み："+seenCount.toLocaleString("ja-JP")+"／"+available.toLocaleString("ja-JP")+"問": "";
 syncReview();
}
function load(){
 if(expanded||bankLoad)return;
 loadFailed=false;
 bankLoad=loadBank().then(data=>{expanded=data;migrateLegacy(legacyMap);}).catch(()=>{loadFailed=true;}).finally(()=>{bankLoad=null;syncCounts();});
 syncCounts();
}
const printTextCache=new Map();
let nextPrintLookup=0;
function lookupPrint(url){
 const id=url?.match(/\/([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})\./i)?.[1];
 if(!id)return Promise.reject(Error("No Japanese printing URL"));
 if(printTextCache.has(id))return printTextCache.get(id);
 const wait=Math.max(0,nextPrintLookup-Date.now());nextPrintLookup=Date.now()+wait+150;
 const pending=new Promise(resolve=>setTimeout(resolve,wait)).then(async()=>{
  const r=await fetch("https://api.scryfall.com/cards/"+id,{headers:{Accept:"application/json"},credentials:"omit",referrerPolicy:"no-referrer",signal:AbortSignal.timeout(8000)});
  if(!r.ok)throw Error("Unavailable");
  const d=await r.json();if(d.lang!=="ja")throw Error("No Japanese printing");
  const t=d.printed_text??d.card_faces?.map(f=>f.printed_text).filter(Boolean).join("\n\n");
  if(!t)throw Error("No Japanese rules text");
  // Japanese-language Scryfall records can lack translated printed text. Never show English as Japanese.
  if(!/[\u3040-\u30ff\u3400-\u9fff]/u.test(t))throw Error("Translated Japanese rules unavailable");
  return t.trim();
 });
 printTextCache.set(id,pending);
 pending.catch(()=>printTextCache.delete(id));
 return pending;
}
function card(name,onChoose){
 const data=CARD_DATA[name];
 const tile=document.createElement("article");tile.className="card-tile";
 const el=document.createElement(onChoose?"button":"div");
 el.className="card";
 if(onChoose){el.type="button";el.dataset.card=name;el.onclick=()=>onChoose(el);}
 const img=document.createElement("img");img.alt="";img.loading="lazy";
 const fb=document.createElement("div");fb.className="fallback";fb.setAttribute("aria-hidden","true");fb.textContent=data.name;
 const label=document.createElement("span");label.className="name";label.textContent=data.name;
 const badge=document.createElement("span");badge.className="image-lang";badge.setAttribute("aria-hidden","true");
 el.append(img,fb,label,badge);tile.append(el);
 loadCardImage(img,name,(ok,lang)=>{
  if(!ok)el.classList.add("failed");
  badge.textContent=ok?(lang==="ja"?"日本語画像":"英語画像"):"画像なし";
 });
 const detail=document.createElement("details");detail.className="oracle";
 const summary=document.createElement("summary");summary.textContent=data.printed?"印刷時の日本語テキスト":"日本語の効果";
 summary.setAttribute("aria-label",data.name+"の"+summary.textContent);
 const english=document.createElement("p");english.className="english-name";english.textContent=data.english??(name===data.name?"":name);
 const info=document.createElement("p");info.className="card-type";info.textContent=[data.mana,data.type,data.pt].filter(Boolean).join("　");
 const rules=document.createElement("p");rules.className="oracle-text";rules.textContent=data.rules;
 detail.append(summary,english,info,rules);
 if(data.printed){
  rules.textContent="開くとScryfallから日本語の効果を読み込みます。";
  const ref=line(detail,"a","Scryfallでカードを見る");
  ref.href="https://scryfall.com/search?q="+encodeURIComponent('!"'+data.english+'"');
  ref.target="_blank";ref.rel="noopener noreferrer";
  let loading=false,ready=false;
  detail.ontoggle=async()=>{
   if(!detail.open||loading||ready)return;
   loading=true;rules.textContent="日本語の効果を読み込み中…";
   try{rules.textContent=await lookupPrint(data.ja);ready=true;}
   catch{rules.textContent="このカードの日本語テキストは現在取得できません。日本語のカード画像を確認するか、Scryfallでカード情報を参照してください。";}
   finally{loading=false;}
  };
 }
 for(const [i,url] of (data.extraJA??[]).entries()){
  const back=document.createElement("img");back.className="extra-face";back.alt=data.name+"（別の面 "+(i+2)+"）";back.loading="lazy";back.src=url;detail.append(back);
 }
 tile.append(detail);
 return tile;
}
function show(){
 locked=false;const q=deck[at];markSeen(q);$("progress").textContent=(playingReview?"復習 · ":"")+(at+1)+" / "+deck.length+"問";$("score").textContent="正解 "+score;
 $("question").textContent=colorName(q.color)+(q.draft?"・試作":"")+"：コンボを完成させよう";
 $("condition").textContent="このカードの組み合わせで狙う結果："+q.result+"。";
 renderStartConditions(q);
 $("draftNote").hidden=!q.draft;
 $("known").replaceChildren(...q.cards.filter(n=>n!==q.answer).map(n=>card(n,null)));
 const bad=q.draft?q.options:Object.keys(decoys[decoyKey(q)]);
 $("choices").replaceChildren(...shuffle([q.answer,...bad]).map(n=>card(n,b=>choose(n,b,q))));
 $("feedback").hidden=true;$("next").hidden=true;
}
function line(parent,tag,txt,cls){
 const e=document.createElement(tag);
 e.textContent=txt;if(cls)e.className=cls;parent.append(e);
 return e;
}
function list(parent,entries,ordered=false,lang=null){
 if(!entries.length)return;
 const el=document.createElement(ordered?"ol":"ul");
 if(lang)el.setAttribute("lang",lang);
 for(const row of entries)line(el,"li",row);
 parent.append(el);
}
function renderExplanation(q){
 const box=document.createElement("div");box.className="combo-explanation";
 line(box,"h3","コンボ解説");
 if(q.guide){
  const [prep,steps,reason]=q.guide;
  line(box,"h4","始める前に");list(box,prep);
  line(box,"h4","動かす順番");list(box,steps,true);
  line(box,"h4","成立する理由");line(box,"p",reason);
  return box;
 }
 if(q.ruleAudit?.steps){
  line(box,"h4","裁定を反映した手順");
  list(box,q.ruleAudit.steps.map(t=>t.replace("［正解］","《"+CARD_DATA[q.answer].name+"》")),true);
  return box;
 }
 line(box,"h4","始める前に");
 list(box,q.startConditions.map(t=>t.replaceAll("［空欄］","《"+CARD_DATA[q.answer].name+"》")));
 if(q.stepsJP?.length){
  line(box,"h4","日本語の手順（抜粋）");
  const ol=document.createElement("ol");
  for(const [number,txt] of q.stepsJP){const li=line(ol,"li",txt);li.value=number;}
  box.append(ol);
 }
 line(box,"p","未収録の手順は、下のCommander Spellbookの引用元で確認できます。","explanation-credit");
 return box;
}
function choose(n,b,q){
 if(locked)return;locked=true;
 const identity=reviewKey(q);
 if(n===q.answer){score++;missed.delete(identity);}
 else{b.classList.add("wrong");missed.delete(identity);missed.add(identity);roundWrong.add(identity);}
 saveMissed();
 for(const choice of $("choices").querySelectorAll("button.card")){
  if(choice.dataset.card===q.answer)choice.classList.add("correct");
  choice.disabled=true;
 }
 const f=$("feedback");f.replaceChildren();
 const p=line(f,"p",(n===q.answer?"正解！":"不正解。")+" 正解は《"+CARD_DATA[q.answer].name+"》。","answer-status");
 p.setAttribute("role","status");
 line(f,"p","コンボの結果："+q.result+"。");
 f.append(renderExplanation(q));
 const a=document.createElement("a");a.href=q.source;a.target="_blank";a.rel="noopener noreferrer";a.textContent="引用元：Commander Spellbook";
 if(n!==q.answer&&!q.draft){
  const why=document.createElement("p");why.className="decoy-explanation";
  why.textContent="《"+CARD_DATA[n].name+"》では成立しない理由："+decoys[decoyKey(q)][n];
  f.append(why);
 }
 f.append(a);
 if(q.ruleAudit){
  const audit=document.createElement("div");audit.className="rules-audit-note";
  line(audit,"h4","裁定・別解の確認メモ");line(audit,"p",q.ruleAudit.note);
  for(const [text,href] of q.ruleAudit.refs){
   const row=line(audit,"p","");const ref=line(row,"a",text);ref.href=href;ref.target="_blank";ref.rel="noopener noreferrer";
  }
  f.append(audit);
 }
 f.hidden=false;$("score").textContent="正解 "+score;$("next").hidden=false;$("next").textContent=at===deck.length-1?"結果を見る":"次の問題";
}
function startRound(pool,review=false){
 pool=pool.filter(q=>q.startConditions);
 if(!pool.length)return;
 playingReview=review;roundWrong=new Set();$("app").dataset.view="game";
 deck=review?shuffle(pool).slice(0,10):unseenFirst(pool);at=0;score=0;$("setup").hidden=true;$("finish").hidden=true;$("game").hidden=false;show();
}
function start(){
 if(!$("start").disabled)startRound(filteredQuestions());
}
for(const c of choicesColor)$("pick-"+c).onclick=()=>pickColor(c);
for(const g of genres)$("genre-"+g).onclick=()=>pickGenre(g);
paintColor();load();
$("start").onclick=start;
$("again").onclick=()=>{$("app").dataset.view="setup";$("finish").hidden=true;$("setup").hidden=false;syncCounts();};
$("review-import").onclick=()=>$("review-file").click();
$("review-file").onchange=importReview;
$("review-start").onclick=()=>startRound(reviewCandidates(),true);
$("review-now").onclick=()=>startRound(reviewCandidates(roundWrong),true);
$("next").onclick=()=>{at++;if(at<deck.length)show();else{$("game").hidden=true;$("finish").hidden=false;syncReview();$("result").textContent=deck.length+"問中 "+score+"問正解（"+Math.round(score/deck.length*100)+"%）";}};

const TACTICS={
 stop:[
 {id:"stop-basalt",name:"アンタップの前に",cards:["Kinnan, Bonder Prodigy","Basalt Monolith"],source:"129-4131",
 scene:"対戦相手の戦場にキナンと、タップ状態の玄武岩のモノリス。相手は3マナ払ってモノリスのアンタップ能力を起動した。まだ解決しておらず、あなたに優先権がある。手札の《削剥》を唱えられる。ほかに使えるカードや能力はない。",
 ask:"この場で次のマナ生成を止めるには？",
 answers:[
 ["今、《削剥》のアーティファクト破壊でモノリスを破壊する。","アンタップ前なので、モノリスをもう一度タップしてマナを出すことはできない。起動済みの能力はスタックに残るが、解決時にはアンタップするモノリスがない。"],
 ["相手が次にモノリスをタップしたことに対応して破壊する。","モノリスのタップでマナを出す能力はスタックを使わない。タップとマナ生成の間に対応することはできない。"],
 ["《削剥》の3点ダメージをモノリスに与える。","モノリスはクリーチャーではないので、《削剥》のダメージのモードでは対象にできない。"],
 ["モノリスのアンタップ能力そのものを《削剥》で対象に取る。","《削剥》はクリーチャーかアーティファクトを対象にする。スタック上の能力を対象にはできない。"]]},
 {id:"stop-siona",name:"オーラの対象を消す",cards:["Siona, Captain of the Pyleas","Shielded by Faith"],source:"432-1687",
 scene:"対戦相手は《信仰の守り》を唱え、戦場の兵士トークン1体を対象にした。対戦相手の戦場にはシオーナもいる。あなたの手札に《剣を鍬に》があり、白1マナで今すぐ1回だけ唱えられる。",
 ask:"《信仰の守り》をこのターン戦場に出さないには？",
 answers:[
 ["解決前に、対象になっている兵士を《剣を鍬に》で追放する。","オーラ呪文は唯一の対象を失うので解決せず、戦場に出ない。シオーナが残っていても、対象を勝手に選び直すことはない。"],
 ["解決前に、シオーナを《剣を鍬に》で追放する。","トークン連鎖は防げるが、対象の兵士が残るので《信仰の守り》は戦場に出る。今回はオーラの着地を防ぐのが条件。"],
 ["《剣を鍬に》でスタック上の《信仰の守り》を追放する。","《剣を鍬に》が対象にできるのは戦場のクリーチャー。オーラ呪文は対象にできない。"],
 ["いったん解決させ、シオーナの誘発に対応して兵士を追放する。","その時点でオーラはすでに戦場に出ているので、今回の目的は達成できない。"]]},
 {id:"stop-niv",name:"最初の1点は飛ぶ",cards:["Niv-Mizzet, Parun","Curiosity"],source:"1089-2353",
 scene:"相手のニヴ＝ミゼットに《好奇心》がついている。相手がカードを引き、ニヴの1点能力があなたを対象にスタックに乗った。あなたの戦場に《クァーサルの群れ魔道士》がいて、1マナを払い、生け贄に捧げて能力を今起動できる。ほかにダメージやドローを起こす手段はない。",
 ask:"今ある1点能力は残して、そこから始まる連鎖を止めるには？",
 answers:[
 ["1点が解決する前に群れ魔道士の能力で《好奇心》を破壊する。","すでにスタックにあるニヴの能力は残るが、ダメージが与えられる時点に《好奇心》がないので、そこからドローは誘発しない。起動型能力なので、呪文を唱えたときのニヴの能力も誘発させない。"],
 ["群れ魔道士の能力でニヴ＝ミゼットを破壊する。","ニヴはアーティファクトでもエンチャントでもないので、群れ魔道士の能力の対象にできない。"],
 ["ニヴの1点能力を群れ魔道士の能力で破壊する。","群れ魔道士の能力が対象にできるのは戦場のアーティファクトかエンチャント。能力を破壊することはできない。"],
 ["ダメージを受けて《好奇心》が誘発した後で、《好奇心》を破壊してそのドローも消す。","一度スタックに乗った能力は、発生源を破壊しても消えない。《好奇心》による次の1ドローまで防ぐなら、ダメージ前に動く。"]]},
 {id:"stop-ballista",name:"補充を止める",cards:["Heliod, Sun-Crowned","Walking Ballista"],source:"1274-3693",
 scene:"相手の歩行バリスタには絆魂があり、カウンターが残り1個。最初の1点で相手がライフを得て、ヘリオッドがバリスタを対象にカウンターを置く能力を誘発させた。あなたのライフは5点。手札の《もみ消し》を青1マナで1回だけ使える。",
 ask:"現在スタックにある能力に何をすると、ループを切れる？",
 answers:[
 ["ヘリオッドの誘発型能力を《もみ消し》で打ち消す。","バリスタにカウンターが戻らない。残り1個を外しても、バリスタは通常0/0で墓地に置かれ、もうカウンターを補えない。"],
 ["最初のバリスタの1点能力を《もみ消し》で打ち消す。","最初の1点はすでに解決したので、もう対象にはできない。"],
 ["バリスタに付いた絆魂を《もみ消し》で打ち消す。","絆魂は常在型能力。スタックに乗らず、《もみ消し》では対象にできない。"],
 ["バリスタのカウンターそのものを《もみ消し》で打ち消す。","カウンターはスタック上の起動型能力でも誘発型能力でもない。"]]},
 {id:"stop-godo",name:"戦闘より前に",cards:["Godo, Bandit Warlord","Helm of the Host"],source:"1692-4251",
 scene:"相手のメイン・フェイズ。ゴドーを対象に、多勢の兜の装備能力が起動されたところ。兜はまだ装備されていない。あなたには《解呪》が1枚あり、今唱えられる。ほかに使えるカードはない。",
 ask:"兜から最初のゴドーのコピーが出ること自体を防ぐには？",
 answers:[
 ["装備能力の解決前に、《解呪》で多勢の兜を破壊する。","装備能力はスタックに残るが、戦場に兜がないので装備できない。戦闘開始時にも兜の能力は誘発しない。"],
 ["最初の戦闘開始時に兜の能力がスタックに乗ってから破壊し、その能力も消す。","兜を破壊しても、すでにスタックに乗った能力は消えない。この状況では最初のコピーが出るのを防げない。"],
 ["装備能力を解決させてから、ゴドーを《解呪》で破壊する。","通常のゴドーはアーティファクトでもエンチャントでもないため、《解呪》では対象にできない。"],
 ["《解呪》で装備能力そのものを対象に取る。","《解呪》はアーティファクトかエンチャントを破壊する呪文。スタック上の能力は対象にできない。"]]}
 ],
 next:[
 {id:"next-basalt",name:"1周で1マナ増える",cards:["Kinnan, Bonder Prodigy","Basalt Monolith"],source:"129-4131",
 scene:"自分のキナンと玄武岩のモノリスが戦場にある。モノリスをタップしてマナを出し、プールには無色4マナ。モノリスはタップ状態で、あなたに優先権がある。",
 ask:"無色マナを増やしながら元の盤面に戻る次の一手は？",
 answers:[
 ["無色3マナを払ってモノリスのアンタップ能力を起動する。","能力が解決するとモノリスがアンタップし、無色1マナがプールに残る。これを繰り返せる。"],
 ["マナを払わずもう一度モノリスをタップする。","モノリスはすでにタップ状態。タップを起動コストとして支払えない。"],
 ["モノリスの能力をもう一度使うため、アンタップ・ステップまで待つ。","モノリスは通常のアンタップ・ステップにはアンタップしない。出したマナも通常は次のフェイズまで持ち越せない。"],
 ["キナンの7マナの能力でモノリスをアンタップする。","キナンの起動型能力はライブラリーの上からクリーチャーを戦場に出しうる能力。アンタップはしない。"]]},
 {id:"next-siona",name:"新しい兵士への付け替え",cards:["Siona, Captain of the Pyleas","Shielded by Faith"],source:"432-1687",
 scene:"自分のシオーナと《信仰の守り》が戦場にある。オーラが最初のクリーチャーについたので、シオーナの誘発が解決して兵士が1体出た。その兵士が出たことで《信仰の守り》自身の能力がスタックに乗っている。",
 ask:"さらに兵士を出すために、その能力をどう解決する？",
 answers:[
 ["《信仰の守り》を、新しく出た兵士に付け替える。","オーラが新しく自分のクリーチャーにつくので、シオーナが再び誘発する。次の兵士が出れば同じことを繰り返せる。"],
 ["《信仰の守り》を現在ついているクリーチャーにつけたまま、シオーナを誘発させる。","すでについたままでは、オーラが新たについたことにならない。"],
 ["付け替え先として、新しい兵士ではなくシオーナを自由に選ぶ。","この誘発型能力で移せる先は、いま戦場に出たそのクリーチャー。任意のクリーチャーを選ぶものではない。"],
 ["兵士を生け贄にして誘発を増やす。","シオーナのこの能力は死亡ではなく、オーラが自分のクリーチャーにつくことで誘発する。"]]},
 {id:"next-niv",name:"ドローを続ける",cards:["Niv-Mizzet, Parun","Curiosity"],source:"1089-2353",
 scene:"《好奇心》が自分のニヴ＝ミゼットについている。いまニヴの能力で対戦相手に1点を与え、《好奇心》の誘発型能力が解決しようとしている。ライブラリーにはまだ10枚あり、この対戦相手にあと1点与えたい。",
 ask:"今の能力の解決中に何を選ぶ？",
 answers:[
 ["《好奇心》でカードを1枚引く。","カードを引くとニヴが誘発し、次の1点の対象を選べる。そこで対戦相手に与えると、《好奇心》はまた誘発する。"],
 ["《好奇心》のドローを断っても、ニヴの次の1点が自動で誘発する。","新たにカードを引かなければ、この《好奇心》からニヴの次の1点は誘発しない。"],
 ["《好奇心》で対戦相手に1枚引かせる。","《好奇心》で引けるのは、その誘発型能力をコントロールしている自分だけ。"],
 ["《好奇心》の解決中に、ドローの代わりにニヴで対象へダメージを与える。","《好奇心》にはダメージを選ぶモードはない。先にドローし、それで誘発したニヴの能力を別に解決する。"]]},
 {id:"next-ballista",name:"絆魂を先に",cards:["Heliod, Sun-Crowned","Walking Ballista"],source:"1274-3693",
 scene:"自分のヘリオッドと歩行バリスタが戦場にいる。バリスタには＋1/＋1カウンター2個、絆魂はまだない。白を含む2マナを使え、相手は妨害しない。最初のダメージからカウンターを補うループを始めたい。",
 ask:"この状況で、まず何をする？",
 answers:[
 ["ヘリオッドでバリスタに絆魂を与え、その解決後にバリスタの1点能力を起動する。","絆魂が有効な状態でダメージを与えるとライフを得る。ヘリオッドが誘発してバリスタにカウンターが戻る。"],
 ["絆魂なしで先に1点を解決し、後から絆魂をつけてその1点分のライフを得る。","後から絆魂をつけても、すでに与えたダメージにさかのぼってライフは得られない。"],
 ["ヘリオッドで直接バリスタにカウンターを置いて、増やした分を外す。","ヘリオッドの起動型能力は絆魂を与える。カウンターを置くには、ライフ獲得で誘発させる必要がある。"],
 ["最初からカウンター2個を連続で外し、両方の1点をスタックに置く。","通常はバリスタが0/0になり、能力の解決前に墓地に置かれる。今回は絆魂もなく、カウンターを戻せない。"]]},
 {id:"next-malcolm",name:"攻撃中にループを始める",cards:["Malcolm, Keen-Eyed Navigator","Glint-Horn Buccaneer"],source:"4508-4869",
 scene:"自分のマルコムと光り角の海賊が戦場にいる。ちょうど海賊を攻撃クリーチャーに指定した。対戦相手は2人で、どちらにもダメージを与えられる。手札1枚と{1}{R}があり、ほかに使える手段はない。",
 ask:"ブロック指定を待たずに連鎖を始めるには？",
 answers:[
 ["攻撃中の海賊の能力を{1}{R}と手札1枚で起動する。","手札を捨てたことで海賊が各対戦相手に1点を与え、マルコムが宝物を2つ作る。海賊の起動型能力も解決すれば次に捨てるカードを引ける。"],
 ["マルコムをタップして宝物2つを作る。","マルコムの宝物生成は、海賊が対戦相手にダメージを与えたことで誘発する。タップして直接宝物を作る能力はない。"],
 ["海賊の能力の解決で先にカードを引き、それを同じ起動のコストとして捨てる。","手札を捨てることは起動コスト。解決で引くカードを、その同じ起動のコストにすることはできない。"],
 ["いったん戦闘を終え、第2メイン・フェイズに海賊の能力を起動する。","光り角の海賊の能力を起動できるのは、それが攻撃している間だけ。"]]}
 ]
};

const TACTICS_TITLES={stop:"どこで止める？",next:"次の一手は？"};
let tacticMode=null,tacticDeck=[],tacticAt=0,tacticScore=0,tacticLocked=false;
function showTactic(){
 tacticLocked=false;
 const q=tacticDeck[tacticAt];
 $("tactic-progress").textContent=(tacticAt+1)+" / "+tacticDeck.length+"問";
 $("tactic-score").textContent="正解 "+tacticScore;
 $("tactic-title").textContent=q.name;
 $("tactic-scene").textContent=q.scene;
 $("tactic-question").textContent=q.ask;
 $("tactic-cards").replaceChildren(...q.cards.map(name=>card(name,null)));
 $("tactic-options").replaceChildren(...shuffle(q.answers.map(([label],i)=>({label,i}))).map(({label,i})=>{
  const one=document.createElement("button");one.type="button";one.textContent=label;one.dataset.pick=String(i);one.className="tactic-option";
  one.onclick=()=>answerTactic(i,one,q);
  return one;
 }));
 $("tactic-feedback").replaceChildren();$("tactic-feedback").hidden=true;$("tactic-advance").hidden=true;
}
function answerTactic(i,button,q){
 if(tacticLocked||q!==tacticDeck[tacticAt])return;
 tacticLocked=true;
 if(i===0)tacticScore++;
 else button.classList.add("wrong");
 for(const option of $("tactic-options").querySelectorAll("button.tactic-option")){
  option.disabled=true;
  if(option.dataset.pick==="0")option.classList.add("correct");
 }
 const f=$("tactic-feedback");
 line(f,"p",i===0?"正解！":"不正解。","answer-status").setAttribute("role","status");
 line(f,"h4","正解の一手");
 line(f,"p",q.answers[0][0]);
 line(f,"h4","なぜ成立する？");
 line(f,"p",q.answers[0][1]);
 if(i!==0){line(f,"h4","選んだ一手では");line(f,"p",q.answers[i][1],"decoy-explanation");}
 const alternatives=document.createElement("details");alternatives.className="tactic-alternatives";f.append(alternatives);
 line(alternatives,"summary","ほかの選択肢の解説");
 const list=document.createElement("dl");alternatives.append(list);
 for(const [label,why] of q.answers.slice(1)){line(list,"dt",label);line(list,"dd",why);}
 const a=line(f,"a","引用元：Commander Spellbook");a.href="https://commanderspellbook.com/combo/"+q.source+"/";a.target="_blank";a.rel="noopener noreferrer";
 const rules=line(f,"a","参考：マジック総合ルール","tactic-rules");rules.href=q.id==="stop-godo"?"https://magic.wizards.com/en/news/feature/dominaria-release-notes":"https://magic.wizards.com/en/rules";rules.target="_blank";rules.rel="noopener noreferrer";
 f.hidden=false;
 $("tactic-score").textContent="正解 "+tacticScore;
 $("tactic-advance").textContent=tacticAt===tacticDeck.length-1?"結果を見る":"次の問題";
 $("tactic-advance").hidden=false;
}
function startTactics(mode){
 if(!Object.hasOwn(TACTICS,mode))return;
 tacticMode=mode;tacticAt=0;tacticScore=0;tacticDeck=shuffle(TACTICS[mode]);
 $("setup").hidden=true;$("game").hidden=true;$("finish").hidden=true;
 $("tactic-result").hidden=true;$("tactic-game").hidden=false;
 $("tactic-kind").textContent=TACTICS_TITLES[mode];
 showTactic();
}
function returnFromTactics(){
 tacticLocked=true;$("tactic-game").hidden=true;$("tactic-result").hidden=true;$("setup").hidden=false;syncCounts();
}
$("tactic-stop").onclick=()=>startTactics("stop");
$("tactic-next").onclick=()=>startTactics("next");
$("tactic-exit").onclick=returnFromTactics;
$("tactic-back").onclick=returnFromTactics;
$("tactic-retry").onclick=()=>startTactics(tacticMode);
$("tactic-advance").onclick=()=>{
 if(!tacticLocked||$("tactic-game").hidden)return;
 tacticAt++;
 if(tacticAt<tacticDeck.length){showTactic();return;}
 $("tactic-game").hidden=true;$("tactic-result").hidden=false;
 $("tactic-final").textContent=TACTICS_TITLES[tacticMode]+"："+tacticDeck.length+"問中 "+tacticScore+"問正解";
};
