(function (compId) {
    var _ = null, y = true, n = false, x12 = 'break-word', x2 = '5.0.0', x28 = '%', x4 = 'rgba(0,0,0,0)', x20 = '100%', x22 = 'Rectangle', g = 'image', po = 'center', x34 = '3%', x32 = '0%', x24 = 'true', x30 = 'Text2', x37 = '-2880px', x11 = 'none solid rgb(0, 0, 0)', x = 'text', m = 'rect', x19 = '0px', x39 = '1000%', i = 'none', x23 = 'rgba(192,192,192,1)', x36 = 'flycoIntelligentAppliance', x40 = '316.2%', x3 = '5.0.1.386', x26 = 'rgba(51,118,193,1.00)', x7 = 'em', x43 = '65%', x42 = '50%', x38 = '-111.3%', x35 = '0.1', x9 = 'Arial, Helvetica, sans-serif', x33 = '5.6%', l = 'normal', x21 = 'auto', x29 = 'rgba(255,255,255,1.00)', x15 = 'none solid rgb(255, 255, 255)', x25 = 'farthest-corner', x14 = '1.5', x1 = '5.0.1', x44 = 'no-repeat', x10 = '400', x8 = '0.9', xc = 'rgba(0,0,0,1)', x18 = 'rgba(255,255,255,1)', x27 = 'rgba(30,90,157,1.00)';
    var g41 = 'flycoIntelligentAppliance.svg', g17 = 'demodevice.png', g16 = 'icons-svg/carat-left.svg', g5 = 'bigad.png';
    var s6 = "您可以进行虚拟设备操作体验", s31 = "上海飞科电器股份有限公司<br>FLYCO.COM<br>", s13 = "试用体验设备";
    var im = 'images/', aud = 'media/', vid = 'media/', js = 'js/', fonts = {}, opts = {
        'gAudioPreloadPreference': 'auto',
        'gVideoPreloadPreference': 'auto'
    }, resources = [], scripts = [], symbols = {
        "stage": {
            v: x1,
            mv: x2,
            b: x3,
            stf: i,
            cg: i,
            rI: n,
            cn: {
                dom: [{
                    id: 'bigad',
                    t: g,
                    r: ['0.2%', 'auto', '100%', '65%', 'auto', '0px'],
                    f: [x4, im + g5, '0%', '0%', '100%', 'auto', 'no-repeat']
                }, {
                    id: 'toDemo',
                    t: 'group',
                    r: ['0%', 'auto', '100%', '26.6%', 'auto', '64.9%'],
                    c: [{
                        id: 'hint',
                        t: x,
                        r: ['auto', '40%', 'auto', '10%', '10%', 'auto'],
                        text: s6,
                        align: "left",
                        n: [x9, [x8, x7], "rgba(142,142,142,1.00)", x10, x11, l, x12, l]
                    }, {
                        id: 'try',
                        t: x,
                        r: ['auto', '15%', 'auto', '10%', '10%', 'auto'],
                        text: s13,
                        align: "left",
                        n: [x9, [x14, x7], "rgba(0,0,0,1.00)", x10, x15, l, x12, l]
                    }, {
                        id: 'carat-left',
                        t: g,
                        r: ['auto', '-186.3%', '79%', '480.7%', '-31.6%', 'auto'],
                        f: [x4, im + g16, '0px', '0px'],
                        tf: [[], [], [], ['0.1', '0.1']]
                    }, {
                        id: 'demoDevice',
                        t: g,
                        r: ['2%', 'auto', '32.6%', '81.6%', 'auto', '25%'],
                        br: ["0%", "0%", "0%", "0% 0%"],
                        f: [x4, im + g17, '50%', '50%', 'contain', 'contain', 'no-repeat']
                    }]
                }],
                style: {
                    '${Stage}': {
                        isStage: true,
                        r: ['null', 'null', '100%', '100%', 'auto', 'auto'],
                        overflow: 'hidden',
                        f: [x18]
                    }
                }
            },
            tt: {d: 0, a: y, data: []}
        },
        "loading": {
            v: x1,
            mv: x2,
            b: x3,
            stf: i,
            cg: i,
            rI: y,
            cn: {
                dom: [{
                    r: [x19, x19, x20, x20, x21, x21],
                    id: x22,
                    s: [0, xc, i],
                    t: m,
                    f: [x23, [50, 50, x24, x25, [[x26, 0], [x27, 100]]]]
                }, {
                    n: [x9, [150, x28], x29, x10, x11, l, x12, l],
                    t: x,
                    id: x30,
                    text: s31,
                    align: po,
                    r: [x32, x21, x20, x33, x21, x34]
                }, {
                    tf: [[], [], [], [x35, x35]],
                    id: x36,
                    t: g,
                    r: [x37, x38, x39, x40, x21, x21],
                    f: [x4, im + g41, x42, x42, x43, x21, x44]
                }], style: {'${symbolSelector}': {r: [_, _, x20, x20]}}
            },
            tt: {d: 0, a: y, data: []}
        }
    };
    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);
})("mainPage");
(function ($, Edge, compId) {
    var Composition = Edge.Composition, Symbol = Edge.Symbol;
    Edge.registerEventBinding(compId, function ($) {
//Edge symbol: 'stage'
        (function (symbolName) {
        })("stage");
//Edge symbol end:'stage'

//=========================================================

//Edge symbol: 'loading'
        (function (symbolName) {
            Symbol.bindElementAction(compId, symbolName, "${Rectangle}", "click", function (sym, e) {
            });
//Edge binding end
        })("loading");
//Edge symbol end:'loading'
    })
})(AdobeEdge.$, AdobeEdge, "mainPage");