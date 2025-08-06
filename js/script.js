$(document).ready(function(){
    $(function(){
        $("html, body").animate({ scrollTop: 0 }, 600, "linear");
    });
    // 새로고침 시 최상단으로!!
    $('#nav a').on('click',function(e){
        // console.log(this.hash); 현재 hash 확인용
        if(this.hash !== 0){
            e.preventDefault();
            let hash = this.hash;
            // hash = 현재 hash 선언
            $('html').animate({
                scrollTop : $(hash).offset().top
            },600, function(){
                window.location.hash = hash;
            });
        };  
    });
    // nav를 클릭 시 현재 연결된 hash(각 section의 id값)의 높이로 6초동안 천천히 이동되는 이벤트
    // nav event end


    let sections = ['#home', '#about', '#project', '#design', '#contact'];
    $('.scrollE').children().removeClass('on');
    $(window).on('scroll', function () {
        let scrollTop = $(document).scrollTop();
        // 현재 scroll값을 선언
        sections.forEach(function(id) {
            let sectionTop = $(id).offset().top;
            
            if(scrollTop > sectionTop - 550) {
                $(id + ' article').addClass('on');
            };
            if(scrollTop < sectionTop - 400) {
                $(id + ' article').removeClass('on');
            };
            if(scrollTop > sectionTop - 550) {
                $(id + ' article *:not(h2) ').addClass('on2');
            };
            if(scrollTop < sectionTop - 270) {
                $(id + ' article *:not(h2) ').removeClass('on2');
            };

            $('#nav_list a').removeClass('active');
            sections.forEach(function(id) {
                let sectionTop = $(id).offset().top;
                let sectionHeight = $(id).outerHeight();

                if (scrollTop >= sectionTop - 70 && scrollTop < sectionTop + sectionHeight - 70) {
                    $('#nav_list a[href="' + id + '"]').addClass('active');
                };
            });
        });
    });
    $(window).trigger('scroll');
    // scroll + nav event end

    $('#ham').on('click', function() {
        $(this).toggleClass('ham_click');
        if($(this).hasClass('ham_click')){
            $(this).css({ backgroundImage: 'url(../img/icon/Xicon.png)' });
            $('nav').animate({right: '0'}, 100);
        }else {
            $(this).css({ backgroundImage: 'url(../img/icon/HAMicon.png)' });
            $('nav').animate({right: '-120%'}, 600);
        }
    });
    // ham nav event end


    const keywordList = [
        { keyword: ['열정', '소통', '사용성', '끈기', '디자인', '도전', '퍼블리싱'], class: "px36" },
        { keyword: ['접근성', '구조', '꼼꼼함', '협력', '성실', '체계', '깔끔함'], class: "px24" },
        { keyword: ['리듬', '조화', '반응형', '기획', '배움', '전달', '발전'], class: "px16" }
    ];
    const wrap = document.querySelector("#keyword_Wrap");
    // keyword를 사이즈별(16, 24, 36px)로 그룹화 해 배열로 만들기
    // html의 keyword_Wrap 불러오기 (이 안에 단어를 뿌릴 예정)
    let allWords = [];
    // 키워드를 넣을 배열 준비
    for (let i = 0; i < keywordList.length; i++) {
        let keyWrap = keywordList[i];
        let txtWord = keyWrap.keyword;
        let pxClass = keyWrap.class;  
        // 위에 선언한 keywordeList에서 각 그룹의 단어와 클래스를 하나씩 풀어오기
        for (let j = 0; j < txtWord.length; j++) {
            let word = txtWord[j];
            // txt Word로 뽑아낸 각 단어를 불러오기
            allWords.push({ word, className: pxClass });
            // 준비해놓은 allWords 배열 안에 단어와 클래스명을 객체로 묶어 하나하나 push로 넣가 (총 20개)
        };  
    };
    // END 단어 배열
    let index = 0;
    // 현재 표시된 word가 몇 개인지 기록
    const wordArr = [];
    // wordArr에 현재 사용된 word들의 위치를 기록
    function spacing(x, y) {
        for (var i = 0; i < wordArr.length; i++) {
            var ping = wordArr[i];
            // 현재 단어의 위치를 확인
            var wx = ping.x - x;
            var wy = ping.y - y;
            var wordPlace = Math.sqrt(wx * wx + wy * wy);
            // 입력된 단어와 입력하려는 단어의 좌표 비교
            if (wordPlace <= 110) {
                return false;
                // 거리가 110 이하면 실패
            };
        };
        return true;
        // 거리 조건이 만족됐으면 새 단어 출력 가능
    };
    // END 단어 거리 계산
    function showBatch() {
        const count = 2 + Math.floor(Math.random() * 2);
        // Math.random에 *2를 붙여 0~2 미만의 수 중 랜덤뽑기를 하고 +2를 해 2~3중 랜덤으로 만듦
        for (let i = 0; i < count && index < allWords.length; i++, index++) {
            // count의 수만큼 단어를 뿌리고, 전체 단어를 넘지 않았는지 확인 / 반복 횟수와 입력 단어 수를 증가
            let x, y;
            let tries = 0;
            do {
                x = Math.random() * (wrap.offsetWidth - 60);
                y = Math.random() * (wrap.offsetHeight - 30);
                // 단어의 x, y 좌표를 랜덤하게 뽑고 저장
                tries++;
                if (tries > 20) break; // 무한루프 방지
            } while (!spacing(x, y));
            // 단어가 너무 겹치는지 확인 후 20회 이상 안 되면 위치 찾기 중단 

            wordArr.push({ x, y });

            const { word, className } = allWords[index];
            const span = document.createElement('span');
            span.textContent = word;
            span.className = className;
            span.style.position = 'absolute';
            span.style.left = `${x}px`;
            span.style.top = `${y}px`;

            span.style.opacity = '0';
            span.style.transition = 'opacity 0.6s ease';

            wrap.appendChild(span);

            requestAnimationFrame(() => {
                span.style.opacity = '1';
            })
        }

        if (index < allWords.length) {
            setTimeout(showBatch, 450);
        }
    }
    showBatch();
    // home 랜덤글자 이벤트

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            wrap.innerHTML = '';
            wordArr.length = 0;
            index = 0;
            showBatch();
        }, 300);
    });
    // 랜덤글자 리사이징 이벤트

    let subText = document.querySelector('#sub_text');
    let textWrap = "'하면 된다' , '그냥 하자' 를 모토로 도전을 멈추지 않는 이유정입니다.";
    let split = textWrap.split("");
    // sub_text 요소를 정의
    // textWrap에 텍스트를 담고 한 글자씩 잘라 split에 선언

    function wynamic(arr) {
        if(arr.length > 0){
            subText.textContent = subText.textContent + arr.shift();
            // subText에 글자를 담기
            setTimeout(function(){
                wynamic(arr)}, 75)
                // 0.75초마다 arr함수를 실행
        };
    };
    wynamic(split);
    // home 키보드 입력 이벤트


    $('.project').first().siblings('figure').hide();
    $('#project_menu>li').first().addClass('pro_click')
    $('#project_menu a').click(function(e){
        e.preventDefault();
        // console.log(this.hash);
        $(this).parent().addClass('pro_click').siblings().removeClass('pro_click');
        $(this.hash).show();
        $(this.hash).siblings('figure').hide();
    });
    // project 탭 전환 이벤트

})   // javascript end