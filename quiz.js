"use strict";
// Curated quiz starters. Sources are linked per combo. No client-side Scryfall API calls.
const C=[
 {cards:["Kinnan, Bonder Prodigy","Basalt Monolith"],answer:"Basalt Monolith",result:"無限無色マナ",condition:"キナンと玄武岩のモノリスをコントロール。モノリスをタップするとキナンにより無色4マナを生み、3マナでアンタップできる。",source:"https://commanderspellbook.com/combo/129-4131/",level:"初級"},
 {cards:["Siona, Captain of the Pyleas","Shielded by Faith"],answer:"Shielded by Faith",result:"無限のクリーチャー・トークン",condition:"シオーナをコントロールし、自分のクリーチャーに信仰の守りをつける。トークンが戦場に出るたびに守りをそのトークンへ付け替え、シオーナで次のトークンを作る。",source:"https://commanderspellbook.com/combo/432-1687/",level:"初級"},
 {cards:["Niv-Mizzet, Parun","Curiosity"],answer:"Curiosity",result:"大量のカードドローとダメージ（ライブラリー枚数まで）",condition:"ニヴ＝ミゼットに好奇心をつけ、カードを引くか、ニヴ＝ミゼットが対戦相手にダメージを与えるところから始める。好奇心のドローは任意なので途中で止められる。",source:"https://commanderspellbook.com/combo/1089-2353/",level:"初級"},
 {cards:["Heliod, Sun-Crowned","Walking Ballista"],answer:"Walking Ballista",result:"任意回数のダメージ",condition:"歩行バリスタに+1/+1カウンターが2個以上あり、ヘリオッドの起動能力で絆魂を与えられること。対戦相手へのダメージとライフ獲得でカウンターを補充する。",source:"https://commanderspellbook.com/search/?q=Heliod%2C+Sun-Crowned+Walking+Ballista",level:"初級"},
 {cards:["Godo, Bandit Warlord","Helm of the Host"],answer:"Helm of the Host",result:"追加戦闘フェイズの反復",condition:"多勢の兜をゴドーに装備し、戦闘開始時に非伝説のゴドーのコピーを生成する。コピーの攻撃誘発により追加戦闘を得る。攻撃可能な状態が必要。",source:"https://commanderspellbook.com/search/?q=Godo%2C+Bandit+Warlord+Helm+of+the+Host",level:"初級"},
 {cards:["Malcolm, Keen-Eyed Navigator","Glint-Horn Buccaneer"],answer:"Glint-Horn Buccaneer",result:"各対戦相手への反復ダメージ",condition:"攻撃中の《光り角の海賊》の能力を起動するため、最初に{1}{R}と捨てる手札1枚が必要。2人以上の対戦相手にダメージが通れば、マルコムが作る宝物で次の起動コストをまかなえる。対戦相手が1人になると宝物は1つしか出ないので、続けるには貯めた宝物などが必要。",source:"https://commanderspellbook.com/combo/4508-4869/",level:"中級"},
 {cards:["Chatterfang, Squirrel General","Pitiless Plunderer","Ashnod's Altar"],answer:"Ashnod's Altar",result:"無限の無色マナと死亡誘発",condition:"リストの3枚をコントロールし、最初に生け贄にできるリスが1体必要。リスを供犠台で生け贄にすると宝物と新しいリスが生まれる。",source:"https://commanderspellbook.com/search/?q=Chatterfang%2C+Squirrel+General+Pitiless+Plunderer+Ashnod%27s+Altar",level:"中級"},
 {cards:["Chatterfang, Squirrel General","Pitiless Plunderer","Viscera Seer"],answer:"Viscera Seer",result:"無限の占術と死亡誘発",condition:"最初のリス1体と3枚のパーツが必要。臓物の予見者で生け贄→宝物生成→サワギバによるリス生成を繰り返す。",source:"https://commanderspellbook.com/search/?q=Chatterfang%2C+Squirrel+General+Pitiless+Plunderer+Viscera+Seer",level:"中級"},
 {cards:["Chatterfang, Squirrel General","Pitiless Plunderer","Viscera Seer","Blood Artist"],answer:"Blood Artist",result:"死亡誘発で対戦相手のライフを任意の回数失わせ、自分はライフを得る",condition:"サワギバ、略奪者、予見者、血の芸術家をコントロールし、リス1体から開始する。生け贄ループで血の芸術家が誘発する。",source:"https://commanderspellbook.com/search/?q=Chatterfang+Pitiless+Plunderer+Viscera+Seer+Blood+Artist",level:"上級"},
 {cards:["Chatterfang, Squirrel General","Pitiless Plunderer","Ashnod's Altar","Blood Artist"],answer:"Blood Artist",result:"無限の無色マナを得ながら、死亡誘発で対戦相手のライフを失わせ、自分はライフを得る",condition:"4枚と最初のリス1体が必要。供儀台でリスを生け贄にし、宝物とリスを補充。血の芸術家が死亡を勝ち筋に変える。",source:"https://commanderspellbook.com/search/?q=Chatterfang+Pitiless+Plunderer+Ashnod%27s+Altar+Blood+Artist",level:"上級"}
];
// Wrong choices are curated per question against its explicitly stated goal.
const wrongByAnswer={
 "Basalt Monolith":["Sol Ring","Arcane Signet","Phyrexian Altar"],
 "Shielded by Faith":["Lightning Greaves","Swiftfoot Boots","Skullclamp"],
 "Curiosity":["Pemmin's Aura","Freed from the Real","Lightning Greaves"],
 "Walking Ballista":["Basalt Monolith","Shielded by Faith","Skullclamp"],
 "Helm of the Host":["Lightning Greaves","Swiftfoot Boots","Skullclamp"],
 "Glint-Horn Buccaneer":["Goblin Bombardment","Impact Tremors","Curiosity"],
 "Ashnod's Altar":["Phyrexian Altar","Viscera Seer","Altar of Dementia"],
 "Viscera Seer":["Ashnod's Altar","Skullclamp","Altar of Dementia"],
 "Blood Artist":["Skullclamp","Altar of Dementia","Arcane Signet"]
};
const $=id=>document.getElementById(id);
function shuffle(items){
 const shuffled=[...items];
 for(let i=shuffled.length-1;i>0;i--){
  const j=Math.floor(Math.random()*(i+1));[shuffled[i],shuffled[j]]=[shuffled[j],shuffled[i]];
 }
 return shuffled;
}
const filteredQuestions=()=>C.filter(q=>$("size").value==="all"||String(q.cards.length)===$("size").value);
let preferredCount=10,deck=[],at=0,score=0,locked=false;
function syncCounts(){
 const available=filteredQuestions().length;
 const counts=[...new Set([Math.min(10,available),Math.min(5,available)].filter(Boolean))];
 $("count").replaceChildren(...counts.map(count=>{
  const option=document.createElement("option");
  option.value=String(count);option.textContent=count+"問";
  return option;
 }));
 if(available)$("count").value=String(Math.min(available,preferredCount));
 $("count").disabled=!available;
 $("start").disabled=!available;
 $("available").textContent=available?"この条件で出題できる問題："+available+"問":"この条件の問題はまだありません。";
}
function card(name,select){
 const el=document.createElement(select?"button":"div");el.className="card";if(select)el.type="button";
 const img=document.createElement("img");img.alt=name;img.loading="lazy";
 const url=imageUrl(name);
 img.onerror=()=>el.classList.add("failed");
 if(url){img.src=url;}else{el.classList.add("failed");}
 const fb=document.createElement("div");fb.className="fallback";fb.textContent=name;
 const label=document.createElement("div");label.className="name";label.textContent=name;
 el.append(img,fb,label);return el;
}
function show(){
 locked=false;const q=deck[at];$("progress").textContent=(at+1)+" / "+deck.length+"問";$("score").textContent="正解 "+score;
 $("question").textContent=q.cards.length+"枚コンボ・"+q.level+"：コンボを完成させよう";$("condition").textContent="このカードの組み合わせで狙う結果："+q.result+"。";
 $("known").replaceChildren(...q.cards.filter(n=>n!==q.answer).map(n=>card(n,false)));
 const bad=wrongByAnswer[q.answer];
 $("choices").replaceChildren(...shuffle([q.answer,...bad]).map(n=>{const b=card(n,true);b.onclick=()=>choose(n,b,q);return b}));
 $("feedback").hidden=true;$("next").hidden=true;
}
function choose(n,b,q){
 if(locked)return;locked=true;
 if(n===q.answer){score++;b.classList.add("correct")}else{b.classList.add("wrong");[...$("choices").children].forEach(x=>{if(x.querySelector(".name").textContent===q.answer)x.classList.add("correct")})}
 [...$("choices").children].forEach(x=>x.disabled=true);
 const f=$("feedback");f.replaceChildren();
 const p=document.createElement("p");p.textContent=(n===q.answer?"正解！":"不正解。正解は "+q.answer+"。")+" 結果："+q.result+"。 "+q.condition;
 const a=document.createElement("a");a.href=q.source;a.target="_blank";a.rel="noopener noreferrer";a.textContent="Commander Spellbookで詳細・関連コンボを確認";
 f.append(p,a);f.hidden=false;$("score").textContent="正解 "+score;$("next").hidden=false;$("next").textContent=at===deck.length-1?"結果を見る":"次の問題";
}
function start(){
 const pool=filteredQuestions(),count=Number($("count").value);
 if(count<1||count>pool.length)return;
 deck=shuffle(pool).slice(0,count);at=0;score=0;$("setup").hidden=true;$("finish").hidden=true;$("game").hidden=false;show();
}
$("size").onchange=syncCounts;
$("count").onchange=()=>{preferredCount=$("count").value==="5"?5:10;};
syncCounts();
$("start").onclick=start;$("again").onclick=()=>{$("finish").hidden=true;$("setup").hidden=false};
$("next").onclick=()=>{at++;if(at<deck.length)show();else{$("game").hidden=true;$("finish").hidden=false;$("result").textContent=deck.length+"問中 "+score+"問正解（"+Math.round(score/deck.length*100)+"%）";}};
