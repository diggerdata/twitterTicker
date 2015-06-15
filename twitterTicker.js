/*********************************************************************
 *  www.geekielabs.com
 *  
 *  Other code used:
 *    twitterFetcher coded by Jason Mayes 2015. A present to all the developers out there.
 *    www.jasonmayes.com
 *********************************************************************/

var listTicker = function (options) {

    var defaults = {
        list: [],
        startIndex: 0,
        iLength: 3,
        interval: 3 * 1000
    };
    var options = $.extend(defaults, options);

    var listTickerInner = function (index) {

        if (options.list.length !== options.iLength) {
            setTimeout(listTickerInner, 50);
            return;
        }

        if (!index || index < 0 || index > options.list.length) index = 0;

        var value = options.list[index];
        console.log(options.list.length);
        options.trickerPanel.fadeOut(function () {
            $(this).html(value).fadeIn();
        });

        var nextIndex = (index + 1) % options.list.length;

        setTimeout(function () {
            listTickerInner(nextIndex);
        }, options.interval);
    };

    listTickerInner(options.startIndex);
}
var tweetList = []; //the array we will add the tweets to

window.onload = (function (w, p) {
    "function" === typeof define && define.amd ? define([], p) : "object" === typeof exports ? module.exports = p() : p()
})(this, function () {
    function w(a) {
        return a.replace(/<b[^>]*>(.*?)<\/b>/gi, function (a, g) {
            return g
        }).replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi, "")
    }

    function p(a) {
        a = a.getElementsByTagName("a");
        for (var c = a.length - 1; 0 <= c; c--) a[c].setAttribute("target", "_blank")
    }

    function n(a, c) {
        for (var g = [], f = new RegExp("(^| )" + c + "( |$)"), h = a.getElementsByTagName("*"), b = 0, k = h.length; b <
            k; b++) f.test(h[b].className) && g.push(h[b]);
        return g
    }
    var B = "",
        k = 20,
        C = !0,
        u = [],
        x = !1,
        v = !0,
        q = !0,
        y = null,
        z = !0,
        D = !0,
        A = null,
        E = !0,
        F = !1,
        r = !0,
        G = !0,
        m = null,
        H = {
            fetch: function (a) {
                void 0 === a.maxTweets && (a.maxTweets = 20);
                void 0 === a.enableLinks && (a.enableLinks = !0);
                void 0 === a.showUser && (a.showUser = !0);
                void 0 === a.showTime && (a.showTime = !0);
                void 0 === a.dateFunction && (a.dateFunction = "default");
                void 0 === a.showRetweet && (a.showRetweet = !0);
                void 0 === a.customCallback && (a.customCallback = null);
                void 0 === a.showInteraction && (a.showInteraction = !0);
                void 0 === a.showImages && (a.showImages = !1);
                void 0 === a.linksInNewWindow && (a.linksInNewWindow = !0);
                void 0 === a.showPermalinks && (a.showPermalinks = !0);
                if (x) u.push(a);
                else {
                    x = !0;
                    B = a.domId;
                    k = a.maxTweets;
                    C = a.enableLinks;
                    q = a.showUser;
                    v = a.showTime;
                    D = a.showRetweet;
                    y = a.dateFunction;
                    A = a.customCallback;
                    E = a.showInteraction;
                    F = a.showImages;
                    r = a.linksInNewWindow;
                    G = a.showPermalinks;
                    var c = document.getElementsByTagName("head")[0];
                    null !== m && c.removeChild(m);
                    m = document.createElement("script");
                    m.type = "text/javascript";
                    m.src =
                        "https://cdn.syndication.twimg.com/widgets/timelines/" + a.id + "?&lang=" + (a.lang || "en") + "&callback=twitterFetcher.callback&suppress_response_codes=true&rnd=" + Math.random();
                    c.appendChild(m)
                }
            },
            callback: function (a) {
                var c = document.createElement("div");
                c.innerHTML = a.body;
                "undefined" === typeof c.getElementsByClassName && (z = !1);
                a = [];
                var g = [],
                    f = [],
                    h = [],
                    b = [],
                    m = [],
                    t = [],
                    e = 0;
                if (z)
                    for (c = c.getElementsByClassName("tweet"); e < c.length;) {
                        0 < c[e].getElementsByClassName("retweet-credit").length ? b.push(!0) : b.push(!1);
                        if (!b[e] ||
                            b[e] && D) a.push(c[e].getElementsByClassName("e-entry-title")[0]), m.push(c[e].getAttribute("data-tweet-id")), g.push(c[e].getElementsByClassName("p-author")[0]), f.push(c[e].getElementsByClassName("dt-updated")[0]), t.push(c[e].getElementsByClassName("permalink")[0]), void 0 !== c[e].getElementsByClassName("inline-media")[0] ? h.push(c[e].getElementsByClassName("inline-media")[0]) : h.push(void 0);
                        e++
                    } else
                        for (c = n(c, "tweet"); e < c.length;) a.push(n(c[e], "e-entry-title")[0]), m.push(c[e].getAttribute("data-tweet-id")),
                            g.push(n(c[e], "p-author")[0]), f.push(n(c[e], "dt-updated")[0]), t.push(n(c[e], "permalink")[0]), void 0 !== n(c[e], "inline-media")[0] ? h.push(n(c[e], "inline-media")[0]) : h.push(void 0), 0 < n(c[e], "retweet-credit").length ? b.push(!0) : b.push(!1), e++;
                a.length > k && (a.splice(k, a.length - k), g.splice(k, g.length - k), f.splice(k, f.length - k), b.splice(k, b.length - k), h.splice(k, h.length - k), t.splice(k, t.length - k));
                c = [];
                e = a.length;
                for (b = 0; b < e;) {
                    if ("string" !== typeof y) {
                        var d = f[b].getAttribute("datetime"),
                            l = new Date(f[b].getAttribute("datetime").replace(/-/g,
                                "/").replace("T", " ").split("+")[0]),
                            d = y(l, d);
                        f[b].setAttribute("aria-label", d);
                        if (a[b].innerText)
                            if (z) f[b].innerText = d;
                            else {
                                var l = document.createElement("p"),
                                    I = document.createTextNode(d);
                                l.appendChild(I);
                                l.setAttribute("aria-label", d);
                                f[b] = l;
                            } else f[b].textContent = d
                    }
                    d = "";
                    C ? (r && (p(a[b]), q && p(g[b])), q && (d += '<div class="user">' + w(g[b].innerHTML) + "</div>"), d += '<p class="tweet"><i class="fa fa-sm fa-twitter"></i>' + w(a[b].innerHTML) + "</p>", v && (d = G ? d + ('<p class="timePosted"><a href="' + t[b] + '">' + f[b].getAttribute("aria-label") + "</a></p>") :
                        d + ('<p class="timePosted">' + f[b].getAttribute("aria-label") + "</p>"))) : a[b].innerText ? (q && (d += '<p class="user">' + g[b].innerText + "</p>"), d += '<p class="tweet"><i class="fa fa-sm fa-twitter"></i>' + a[b].innerText + "</p>", v && (d += '<p class="timePosted">' + f[b].innerText + "</p>")) : (q && (d += '<p class="user">' + g[b].textContent + "</p>"), d += '<p class="tweet"><i class="fa fa-sm fa-twitter"></i>' + a[b].textContent + "</p>", v && (d += '<p class="timePosted">' + f[b].textContent + "</p>"));
                    E && (d += '<p class="interact"><a href="https://twitter.com/intent/tweet?in_reply_to=' + m[b] + '" class="twitter_reply_icon"' +
                        (r ? ' target="_blank">' : ">") + 'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' + m[b] + '" class="twitter_retweet_icon"' + (r ? ' target="_blank">' : ">") + 'Retweet</a><a href="https://twitter.com/intent/favorite?tweet_id=' + m[b] + '" class="twitter_fav_icon"' + (r ? ' target="_blank">' : ">") + "Favorite</a></p>");
                    F && void 0 !== h[b] && (l = h[b], void 0 !== l ? (l = l.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0], l = decodeURIComponent(l).split('"')[1]) : l = void 0, d += '<div class="media"><img src="' + l + '" alt="Image from tweet" /></div>');
                    c.push(d);
                    b++
                }
                if (null === A) {
                    a = c.length;
                    thing = 0;
                    f = document.getElementById(B);
                    for (g = 0; g < a; g++) tweetList.push(c[g]); //add to tweetList array

                } else A(c);
                x = !1;
                0 < u.length && (H.fetch(u[0]), u.splice(0, 1))
            }
        };
    return window.twitterFetcher = H
});

var twitterConfig = {
    "id": '608199181354737665',
    "maxTweets": 5, //make sure you set this and iLength below to the same value
    "enableLinks": true,
    "showPermalinks": false,
    "showTime": false,
    "showUser": false,
    "showInteraction": false,
};
twitterFetcher.fetch(twitterConfig);

$(document).ready(function () {
    listTicker({
        list: tweetList,
        startIndex: 0,
        trickerPanel: $('.twitter'),
        iLength: 5, //make sure you set this and "maxTweets" above to the same value
        interval: 5 * 1000,
    });
});
