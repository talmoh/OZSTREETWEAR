var $ = jQuery.noConflict();
let UomoSections = {}
  , UomoElements = {}
  , UomoSelectors = {
    pageBackDropActiveClass: "page-overlay_visible",
    quantityControl: ".qty-control",
    scrollToTopId: "scrollTop",
    $pageBackDrop: document.querySelector(".page-overlay"),
    scrollWidth: window.innerWidth - document.body.clientWidth + "px",
    jsContentVisible: ".js-content_visible",
    starRatingControl: ".star-rating .star-rating__star-icon"
}
  , UomoHelpers = {
    isMobile: !1,
    sideStkEl: {},
    debounce(e, t, i=!1) {
        let s = null;
        return function() {
            let o = i && !s
              , r = () => e.apply(this, arguments);
            clearTimeout(s),
            s = setTimeout(r, t),
            o && r()
        }
    },
    showPageBackdrop() {
        UomoSelectors.$pageBackDrop && UomoSelectors.$pageBackDrop.classList.add(UomoSelectors.pageBackDropActiveClass),
        document.body.classList.add("overflow-hidden"),
        document.body.style.paddingRight = UomoSelectors.scrollWidth,
        document.querySelectorAll(".header_sticky, .footer-mobile").forEach(e => {
            e.style.borderRight = UomoSelectors.scrollWidth + " solid transparent"
        }
        )
    },
    hidePageBackdrop() {
        UomoSelectors.$pageBackDrop && UomoSelectors.$pageBackDrop.classList.remove(UomoSelectors.pageBackDropActiveClass),
        document.body.classList.remove("overflow-hidden"),
        document.body.style.paddingRight = "",
        document.querySelectorAll(".header_sticky, .footer-mobile").forEach(e => {
            e.style.borderRight = ""
        }
        )
    },
    hideHoverComponents() {
        document.querySelectorAll(UomoSelectors.jsContentVisible).forEach(e => {
            e.classList.remove(UomoSelectors.jsContentVisible.substring(1))
        }
        )
    },
    updateDeviceSize: () => window.innerWidth < 992
};
function setCookie(e, t, i) {
    var s = "";
    if (i) {
        var o = new Date;
        o.setTime(o.getTime() + 24 * i * 36e5),
        s = "; expires=" + o.toUTCString()
    }
    document.cookie = e + "=" + (t || "") + s + "; path=/"
}
function pureFadeOut(e) {
    var t = document.getElementById(e);
    t.style.opacity = 1,
    function e() {
        (t.style.opacity -= .02) < 0 ? t.style.display = "none" : requestAnimationFrame(e)
    }()
}
!function() {
    "use strict";
    let e = window.innerWidth - document.body.clientWidth;
    UomoElements.JsHoverContent = function e() {
        let t = UomoSelectors.jsContentVisible.substring(1);
        document.querySelectorAll(".js-hover__open").forEach(e => {
            e.addEventListener("click", e => {
                e.preventDefault();
                let i = e.currentTarget.closest(".hover-container");
                i.classList.contains(t) ? i.classList.remove(t) : (UomoHelpers.hideHoverComponents(),
                i.classList.add(t))
            }
            )
        }
        ),
        document.addEventListener("click", e => {
            e.target.closest(UomoSelectors.jsContentVisible) || UomoHelpers.hideHoverComponents()
        }
        )
    }
    ,
    UomoElements.QtyControl = function e() {
        document.querySelectorAll(UomoSelectors.quantityControl).forEach(function(e) {
            if (e.classList.contains("qty-initialized"))
                return;
            e.classList.add("qty-initialized");
            let t = e.querySelector(".qty__reduce")
              , i = e.querySelector(".qty__increase")
              , s = e.querySelector(".qty-control__number");
            t && t.addEventListener("click", function() {
                s.value = parseInt(s.value) > 1 ? parseInt(s.value) - 1 : parseInt(s.value)
            }),
            i && i.addEventListener("click", function() {
                s.value = parseInt(s.value) + 1
            })
        })
    }
    ,
    UomoElements.ScrollToTop = function e() {
        let t = document.getElementById(UomoSelectors.scrollToTopId);
        if (!t)
            return;
        t.addEventListener("click", function(e) {
            e.preventDefault(),
            e.stopPropagation(),
            window.scrollTo(window.scrollX, 0)
        });
        let i = !1;
        window.addEventListener("scroll", function() {
            250 < window.scrollY && !i && (t.classList.remove("visually-hidden"),
            i = !0),
            250 > window.scrollY && i && (t.classList.add("visually-hidden"),
            i = !1)
        })
    }
    ,
    UomoElements.Search = function() {
        function e() {
            this.selectors = {
                container: ".search-field",
                inputBox: ".search-field__input",
                searchSuggestItem: ".search-suggestion a.menu-link",
                searchFieldActor: ".search-field__actor",
                resetButton: ".search-popup__reset",
                searchCategorySelector: ".js-search-select",
                resultContainer: ".search-result",
                ajaxURL: "./search.html"
            },
            this.searchInputFocusedClass = "search-field__focused",
            this.$containers = document.querySelectorAll(this.selectors.container),
            this._initSearchSelect(),
            this._initSearchReset(),
            this._initSearchInputFocus(),
            this._initAjaxSearch(),
            this._handleAjaxSearch = this._handleAjaxSearch.bind(this),
            this._updateSearchResult = this._updateSearchResult.bind(this)
        }
        return e.prototype = Object.assign({}, e.prototype, {
            _initSearchSelect: function() {
                let e = this;
                this.$containers.forEach(t => {
                    let i = t.querySelector(e.selectors.inputBox);
                    i && i.addEventListener("keyup", i => {
                        let s = i.currentTarget.value.toUpperCase();
                        t.querySelectorAll(e.selectors.searchSuggestItem).forEach(e => {
                            let t = e.innerText;
                            t.toUpperCase().indexOf(s) > -1 ? e.style.display = "" : e.style.display = "none"
                        }
                        )
                    }
                    ),
                    t.querySelectorAll(e.selectors.searchCategorySelector).forEach(i => {
                        i.addEventListener("click", function(i) {
                            i.preventDefault();
                            let s = t.querySelector(e.selectors.searchFieldActor);
                            s && (s.value = i.target.innerText)
                        })
                    }
                    )
                }
                )
            },
            _removeFormActiveClass(e) {
                let t = e.closest(this.selectors.container);
                t.classList.remove(this.searchInputFocusedClass)
            },
            _initSearchReset: function() {
                let e = this;
                document.querySelectorAll(this.selectors.resetButton).forEach(t => {
                    t.addEventListener("click", function(t) {
                        let i = t.target.closest(e.selectors.container)
                          , s = i.querySelector(e.selectors.inputBox)
                          , o = i.querySelector(e.selectors.resultContainer);
                        s.value = "",
                        o.innerHtml = "",
                        e._removeFormActiveClass(t.target)
                    })
                }
                )
            },
            _initSearchInputFocus: function() {
                let e = this;
                document.querySelectorAll(this.selectors.inputBox).forEach(t => {
                    t.addEventListener("blur", function(t) {
                        0 == t.target.value.length && e._removeFormActiveClass(t.target)
                    })
                }
                )
            },
            _initAjaxSearch: function() {
                let e = this;
                document.querySelectorAll(this.selectors.inputBox).forEach(t => {
                    t.addEventListener("keyup", t => {
                        0 == t.target.value.length ? e._removeFormActiveClass(t.target) : e._handleAjaxSearch(t, e)
                    }
                    )
                }
                )
            },
            _handleAjaxSearch: UomoHelpers.debounce( (e, t) => {
                let i = e.target.closest(t.selectors.container)
                  , s = i ? i.method : "GET"
                  , o = t.selectors.ajaxURL;
                o && fetch(o, {
                    method: s
                }).then(function(e) {
                    return e.ok ? e.text() : Promise.reject(e)
                }).then(function(e) {
                    t._updateSearchResult(e, i)
                }).catch(function(e) {
                    t._handleAjaxSearchError(e.message, i)
                })
            }
            , 180),
            _updateSearchResult: function(e, t) {
                let i = new DOMParser().parseFromString(e, "text/html")
                  , s = i.querySelector(".search-result");
                t.querySelector(this.selectors.resultContainer).innerHTML = s.innerHTML,
                t.classList.add(this.searchInputFocusedClass)
            },
            _handleAjaxSearchError: function(e, t) {
                t.classList.remove(this.searchInputFocusedClass),
                console.log(e)
            }
        }),
        e
    }(),
    UomoElements.Aside = function() {
        function e() {
            this.selectors = {
                activator: ".js-open-aside",
                closeBtn: ".js-close-aside",
                activeClass: "aside_visible"
            },
            this.$asideActivators = document.querySelectorAll(this.selectors.activator),
            this.$closeBtns = document.querySelectorAll(this.selectors.closeBtn),
            this._init(),
            this._initCloseActions(),
            this._initBackDropClick()
        }
        return e.prototype = Object.assign({}, e.prototype, {
            _init: function() {
                let e = this;
                $(document).on("click", this.selectors.activator, function(t) {
                    t.preventDefault();
                    let i = $(this).data("aside")
                      , s = document.getElementById(i);
                    UomoHelpers.showPageBackdrop(),
                    s && s.classList.add(e.selectors.activeClass)
                })
            },
            _initCloseActions: function() {
                let e = this;
                this.$closeBtns.forEach(t => {
                    t.addEventListener("click", t => {
                        t.preventDefault(),
                        e._closeAside()
                    }
                    )
                }
                )
            },
            _initBackDropClick() {
                UomoSelectors.$pageBackDrop && UomoSelectors.$pageBackDrop.addEventListener("click", () => {
                    this._closeAside()
                }
                )
            },
            _closeAside: function() {
                UomoHelpers.hidePageBackdrop(),
                document.querySelectorAll("." + this.selectors.activeClass).forEach(e => {
                    e.classList.remove(this.selectors.activeClass)
                }
                )
            }
        }),
        e
    }(),
    UomoElements.Countdown = function() {
        function e(e) {
            this.selectors = {
                element: ".js-countdown"
            },
            this.$container = e || document.body,
            this._init()
        }
        return e.prototype = Object.assign({}, e.prototype, {
            _init: function() {
                let e = this
                  , t = this.$container.querySelectorAll(this.selectors.element);
                t.forEach(function(t) {
                    e._initElement(t)
                })
            },
            _initElement(e) {
                new countdown({
                    target: e
                })
            }
        }),
        e
    }(),
    UomoElements.ShopViewChange = function() {
        function e() {
            this.selectors = {
                element: ".js-cols-size",
                activeClass: "btn-link_active"
            },
            this.$buttons = document.querySelectorAll(this.selectors.element),
            this._init()
        }
        return e.prototype = Object.assign({}, e.prototype, {
            _init: function() {
                let e = this;
                this.$buttons.forEach(function(t) {
                    t.addEventListener("click", function(i) {
                        i.preventDefault();
                        let s = t.dataset.target;
                        e._resetActiveLinks(),
                        this.classList.add(e.selectors.activeClass);
                        let o = t.dataset.cols;
                        e._changeViewCols(s, o)
                    })
                })
            },
            _changeViewCols(e, t) {
                let i = document.getElementById(e);
                i && (i.classList.remove("row-cols-xl-2", "row-cols-xl-3", "row-cols-xl-4", "row-cols-xl-5", "row-cols-xl-6", "row-cols-lg-2", "row-cols-lg-3", "row-cols-lg-4", "row-cols-lg-5", "row-cols-lg-6"),
                i.classList.add("row-cols-xl-" + t, "row-cols-lg-" + t))
            },
            _resetActiveLinks() {
                let e = this;
                document.querySelectorAll(`${this.selectors.element}.${this.selectors.activeClass}`).forEach(t => {
                    t.classList.remove(e.selectors.activeClass)
                }
                )
            }
        }),
        e
    }(),
    UomoElements.Filters = function() {
        function e() {
            this.selectors = {
                element: ".js-filter",
                activeClass: "swatch_active"
            },
            this.$buttons = document.querySelectorAll(this.selectors.element),
            this._init()
        }
        return e.prototype = Object.assign({}, e.prototype, {
            _init: function() {
                let e = this;
                this.$buttons.forEach(function(t) {
                    t.addEventListener("click", function(i) {
                        i.preventDefault(),
                        e._toggleActive(t)
                    })
                })
            },
            _toggleActive(e) {
                e.classList.contains(this.selectors.activeClass) ? e.classList.remove(this.selectors.activeClass) : e.classList.add(this.selectors.activeClass)
            }
        }),
        e
    }(),
    UomoElements.StickyElement = function() {
        function e() {
            this.selectors = {
                element: ".side-sticky"
            },
            this.$stickies = document.querySelectorAll(this.selectors.element),
            this._updateStatus = this._updateStatus.bind(this),
            this._init()
        }
        return e.prototype = Object.assign({}, e.prototype, {
            _init: function() {
                !UomoHelpers.isMobile && (this.$stickies.forEach(function(e) {
                    let t = e.previousElementSibling || e.nextElementSibling
                      , i = t.offsetHeight > e.offsetHeight ? e : t;
                    i.lastKnownY = window.scrollY,
                    !UomoHelpers.sideStkEl.currentTop && (UomoHelpers.sideStkEl.currentTop = 0,
                    UomoHelpers.sideStkEl.initialTopOffset = parseInt(window.getComputedStyle(i).top))
                }),
                window.addEventListener("scroll", this._updateStatus))
            },
            _updateStatus() {
                this.$stickies.forEach(function(e) {
                    let t = e.previousElementSibling || e.nextElementSibling
                      , i = t.offsetHeight > e.offsetHeight ? e : t;
                    var s = i.getBoundingClientRect().top + window.scrollY - i.offsetTop + UomoHelpers.sideStkEl.initialTopOffset
                      , o = i.clientHeight - window.innerHeight + 30;
                    window.scrollY < i.lastKnownY ? UomoHelpers.sideStkEl.currentTop -= window.scrollY - i.lastKnownY : UomoHelpers.sideStkEl.currentTop += i.lastKnownY - window.scrollY,
                    UomoHelpers.sideStkEl.currentTop = Math.min(Math.max(UomoHelpers.sideStkEl.currentTop, -o), s, UomoHelpers.sideStkEl.initialTopOffset),
                    i.lastKnownY = window.scrollY,
                    i.style.top = UomoHelpers.sideStkEl.currentTop + "px"
                })
            }
        }),
        e
    }(),
    UomoSections.Header = function() {
        function t() {
            this.selectors = {
                header: ".header",
                mobileHeader: ".header-mobile",
                mobileMenuActivator: ".mobile-nav-activator",
                mobileMenu: ".navigation",
                mobileMenuActiveClass: "mobile-menu-opened",
                mobileSubNavOpen: ".js-nav-right",
                mobileSubNavClose: ".js-nav-left",
                mobileSubNavHiddenClass: "d-none",
                stickyHeader: ".header_sticky",
                stickyActiveClass: "header_sticky-active"
            },
            this.stickyMinPos = 25,
            this.stkHd = !1,
            this._init = this._init.bind(this),
            this._stickyScrollHander = this._stickyScrollHander.bind(this),
            this._init(),
            window.addEventListener("resize", this._init)
        }
        return t.prototype = Object.assign({}, t.prototype, {
            _init: function() {
                let e = UomoHelpers.isMobile ? this.selectors.mobileHeader : this.selectors.header;
                this.lastScrollTop = 0,
                this.$header = document.querySelector(e),
                this.$header && (UomoHelpers.isMobile ? this._initMobileMenu() : this._initMenuPosition(),
                this._initStickyHeader())
            },
            _initMobileMenu: function() {
                let e = this
                  , t = this.$header.querySelector(this.selectors.mobileMenuActivator)
                  , i = this.$header.querySelector(this.selectors.mobileMenu)
                  , s = 0;
                if (i) {
                    t && $(t).off("click").on("click", function(t) {
                        t.preventDefault(),
                        document.body.classList.contains(e.selectors.mobileMenuActiveClass) ? (document.body.classList.remove(e.selectors.mobileMenuActiveClass),
                        e.$header.style.paddingRight = "",
                        i.style.paddingRight = "") : (document.body.classList.add(e.selectors.mobileMenuActiveClass),
                        e.$header.style.paddingRight = UomoSelectors.scrollWidth,
                        i.style.paddingRight = UomoSelectors.scrollWidth)
                    });
                    let o = i.querySelector(".navigation__list")
                      , r = o.offsetHeight;
                    o && o.querySelectorAll(e.selectors.mobileSubNavOpen).forEach(t => {
                        t.addEventListener("click", function(i) {
                            i.preventDefault,
                            t.nextElementSibling.classList.remove(e.selectors.mobileSubNavHiddenClass),
                            s -= 100,
                            r < t.nextElementSibling.offsetHeight ? (o.style.transform = "translateX(" + s.toString() + "%)",
                            o.style.minHeight = t.nextElementSibling.offsetHeight + "px") : (o.style.transform = "translateX(" + s.toString() + "%)",
                            o.style.minHeight = r + "px")
                        })
                    }
                    ),
                    o && o.querySelectorAll(e.selectors.mobileSubNavClose).forEach(t => {
                        t.addEventListener("click", function(i) {
                            i.preventDefault,
                            s += 100,
                            o.style.transform = "translateX(" + s.toString() + "%)",
                            t.parentElement.classList.add(e.selectors.mobileSubNavHiddenClass);
                            let l = t.closest(".sub-menu");
                            if (l) {
                                let n = r < l.offsetHeight ? l.offsetHeight : r;
                                o.style.minHeight = n + "px"
                            }
                        })
                    }
                    )
                }
            },
            _initStickyHeader: function() {
                if (this.$header.classList.contains(this.selectors.stickyHeader))
                    return;
                let e = this.$header.offsetHeight;
                this.$header.classList.contains("header-transparent-bg") && (e = 0,
                document.querySelectorAll(".header-transparent-bg .header-top").length > 0 && (e = document.querySelector(".header-transparent-bg .header-top").offsetHeight)),
                document.querySelector("main").style.paddingTop = e + "px",
                this.$header.classList.add("position-absolute"),
                document.removeEventListener("scroll", this._stickyScrollHander),
                document.addEventListener("scroll", this._stickyScrollHander)
            },
            _initMenuPosition() {
                let e = this;
                e.$header.querySelectorAll(".box-menu").forEach(t => {
                    e._setBoxMenuPosition(t)
                }
                ),
                e.$header.querySelectorAll(".default-menu").forEach(t => {
                    e._setDefaultMenuPosition(t)
                }
                )
            },
            _setBoxMenuPosition(t) {
                let i = window.innerWidth - t.offsetWidth - e
                  , s = parseInt(window.getComputedStyle(t, null).getPropertyValue("padding-left"))
                  , o = parseInt(window.getComputedStyle(t.previousElementSibling, null).getPropertyValue("padding-left"))
                  , r = t.previousElementSibling.offsetLeft - s + o
                  , l = r;
                r < 0 ? l = 0 : r > i && (l = i),
                t.style.left = `${l}px`
            },
            _setDefaultMenuPosition(t) {
                let i = window.innerWidth - t.offsetWidth - e
                  , s = parseInt(window.getComputedStyle(t, null).getPropertyValue("padding-left"))
                  , o = parseInt(window.getComputedStyle(t.previousElementSibling, null).getPropertyValue("padding-left"))
                  , r = t.previousElementSibling.offsetLeft - s + o
                  , l = r;
                r < 0 ? l = 0 : r > i && (l = i),
                t.style.left = `${l}px`
            },
            _stickyScrollHander() {
                if (this.$header.classList.contains("sticky_disabled"))
                    return;
                let e = window.pageYOffset || document.documentElement.scrollTop;
                e > this.lastScrollTop || e < this.stickyMinPos ? (this.$header.classList.remove(this.selectors.stickyActiveClass),
                this.$header.classList.add("position-absolute")) : e > this.stickyMinPos && (this.$header.classList.add(this.selectors.stickyActiveClass),
                this.$header.classList.remove("position-absolute")),
                this.lastScrollTop = e <= 0 ? 0 : e
            }
        }),
        t
    }(),
    UomoSections.Footer = function() {
        function e() {
            this.selectors = {
                footer: ".footer-mobile"
            },
            this.$footer = document.querySelector(this.selectors.footer),
            this._init = this._init.bind(this),
            this._init(),
            window.addEventListener("resize", this._init)
        }
        return e.prototype = Object.assign({}, e.prototype, {
            _init: function() {
                this.$footer && UomoHelpers.isMobile && setTimeout( () => {
                    this._initStickyFooter()
                }
                , 750)
            },
            _initStickyFooter: function() {
                let e = this.$footer.offsetHeight;
                document.body.style.paddingBottom = e + "px",
                this.$footer.classList.add("position-fixed"),
                setTimeout( () => {
                    this.$footer.classList.add("footer-mobile_initialized")
                }
                , 750)
            }
        }),
        e
    }(),
    UomoSections.CustomerSideForm = function() {
        function e() {
            if (this.selectors = {
                aside: ".aside.customer-forms",
                formsWrapper: ".customer-forms__wrapper",
                registerActivator: ".js-show-register",
                loginActivator: ".js-show-login"
            },
            this.$aside = document.querySelector(this.selectors.aside),
            !this.$aside)
                return !1;
            this.$formsWrapper = this.$aside.querySelector(this.selectors.formsWrapper),
            this.$registerActivator = this.$aside.querySelector(this.selectors.registerActivator),
            this.$loginActivator = this.$aside.querySelector(this.selectors.loginActivator),
            this.$formsWrapper && this._showRegisterForm()
        }
        return e.prototype = Object.assign({}, e.prototype, {
            _showRegisterForm: function() {
                this.$registerActivator.addEventListener("click", () => {
                    this.$formsWrapper.style.left = "-100%"
                }
                )
            }
        }),
        e
    }(),
    UomoSections.CartDrawer = function() {
        function e() {
            if (this.selectors = {
                aside: ".aside.cart-drawer",
                asideHeader: ".aside-header",
                cartItemRemover: ".js-cart-item-remove",
                cartActions: ".cart-drawer-actions",
                cartItemsList: ".cart-drawer-items-list"
            },
            this.asideContentMargin = 30,
            this.$aside = document.querySelector(this.selectors.aside),
            !this.$aside)
                return !1;
            this.$header = this.$aside.querySelector(this.selectors.asideHeader),
            this.$actions = this.$aside.querySelector(this.selectors.cartActions),
            this.$list = this.$aside.querySelector(this.selectors.cartItemsList),
            setTimeout( () => {
                this._initCartItemsList(),
                this._initCartItemRemoval()
            }
            , 1e3)
        }
        return e.prototype = Object.assign({}, e.prototype, {
            _initCartItemsList: function() {
                if (!UomoHelpers.isMobile)
                    return;
                let e = this.$aside.offsetHeight
                  , t = this.$header ? this.$header.offsetHeight : 0
                  , i = this.$actions ? this.$actions.offsetHeight : 0;
                this.$list && (this.$list.style.maxHeight = e - t - i - 2 * this.asideContentMargin + "px")
            },
            _initCartItemRemoval: function() {
                this.$aside.querySelectorAll(this.selectors.cartItemRemover).forEach(e => {
                    e.addEventListener("click", e => {
                        let t = e.target.parentElement
                          , i = t.nextElementSibling;
                        t.classList.add("_removed"),
                        i && i.classList.contains("cart-drawer-divider") && i.classList.add("_removed"),
                        setTimeout( () => {
                            t.remove(),
                            i && i.classList.contains("cart-drawer-divider") && i.remove()
                        }
                        , 350)
                    }
                    )
                }
                )
            }
        }),
        e
    }(),
    UomoSections.SwiperSlideshow = function() {
        function e() {
            this.selectors = {
                container: ".js-swiper-slider"
            },
            this.$containers = document.querySelectorAll(this.selectors.container),
            this._initSliders()
        }
        return e.prototype = Object.assign({}, e.prototype, {
            _initSliders() {
                this.$containers.forEach(function(e) {
                    if (e.classList.contains("swiper-container-initialized"))
                        return;
                    let t = {
                        autoplay: 0,
                        slidesPerView: 1,
                        loop: !0,
                        navigation: {
                            nextEl: ".pc__img-next",
                            prevEl: ".pc__img-prev"
                        }
                    };
                    if (e.classList.contains("swiper-number-pagination") && (t = Object.assign(t, {
                        pagination: {
                            el: ".slideshow-pagination",
                            type: "bullets",
                            clickable: !0,
                            renderBullet: function(e, t) {
                                return '<span class="' + t + '">' + (e + 1).toString().padStart(2, "0") + "</span>"
                            }
                        }
                    })),
                    e.dataset.settings && (t = Object.assign(t, JSON.parse(e.dataset.settings))),
                    e.querySelectorAll(".swiper-slide").length > 1)
                        new Swiper(e,t);
                    else {
                        e.classList.add("swiper-container-initialized");
                        let i = e.querySelector(".swiper-slide");
                        i && i.classList.add("swiper-slide-active")
                    }
                })
            }
        }),
        e
    }(),
    UomoSections.ProductSingleMedia = function() {
        function e() {
            this.selectors = {
                container: ".product-single__media"
            },
            this.$containers = $(this.selectors.container),
            this._initProductMedia()
        }
        function t(e) {
            $(".product-single__thumbnail .swiper-slide").css({
                height: "auto"
            });
            var t = e.activeIndex
              , i = $(e.slides[t]).height();
            $(".product-single__thumbnail .swiper-wrapper, .product-single__thumbnail .swiper-slide").css({
                height: i
            }),
            e.update()
        }
        return e.prototype = Object.assign({}, e.prototype, {
            _initProductMedia() {
                this.$containers.each(function() {
                    if ($(this).hasClass("product-media-initialized"))
                        return;
                    let e = $(this).data("media-type");
                    if ($(this).addClass(e),
                    "vertical-thumbnail" == e)
                        var i = new Swiper(".product-single__thumbnail .swiper-container",{
                            direction: "vertical",
                            slidesPerView: 6,
                            spaceBetween: 0,
                            freeMode: !0,
                            breakpoints: {
                                0: {
                                    direction: "horizontal",
                                    slidesPerView: 4
                                },
                                992: {
                                    direction: "vertical"
                                }
                            },
                            on: {
                                init: function() {
                                    t(this)
                                },
                                slideChangeTransitionEnd: function() {
                                    t(this)
                                }
                            }
                        })
                          , s = new Swiper(".product-single__image .swiper-container",{
                            direction: "horizontal",
                            slidesPerView: 1,
                            spaceBetween: 32,
                            mousewheel: !1,
                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev"
                            },
                            grabCursor: !0,
                            thumbs: {
                                swiper: i
                            },
                            on: {
                                slideChangeTransitionStart: function() {
                                    i.slideTo(s.activeIndex)
                                }
                            }
                        });
                    else if ("vertical-dot" == e)
                        var s = new Swiper(".product-single__image .swiper-container",{
                            direction: "horizontal",
                            slidesPerView: 1,
                            spaceBetween: 32,
                            mousewheel: !1,
                            grabCursor: !0,
                            pagination: {
                                el: ".product-single__image .swiper-pagination",
                                type: "bullets",
                                clickable: !0
                            }
                        });
                    else if ("scroll-snap" == e)
                        ;
                    else if ("horizontal-thumbnail" == e)
                        var i = new Swiper(".product-single__thumbnail .swiper-container",{
                            direction: "horizontal",
                            slidesPerView: 6,
                            spaceBetween: 0,
                            freeMode: !0,
                            breakpoints: {
                                0: {
                                    slidesPerView: 4
                                },
                                992: {
                                    slidesPerView: 7
                                }
                            }
                        })
                          , s = new Swiper(".product-single__image .swiper-container",{
                            direction: "horizontal",
                            slidesPerView: 1,
                            spaceBetween: 32,
                            mousewheel: !1,
                            navigation: {
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev"
                            },
                            grabCursor: !0,
                            thumbs: {
                                swiper: i
                            },
                            on: {
                                slideChangeTransitionStart: function() {
                                    i.slideTo(s.activeIndex)
                                }
                            }
                        });
                    $(this).addClass("product-media-initialized")
                })
            }
        }),
        e
    }(),
    UomoElements.StarRating = function e() {
        let t = Array.from(document.querySelectorAll(UomoSelectors.starRatingControl))
          , i = document.querySelector("#form-input-rating");
        t.forEach(e => {
            e.addEventListener("mouseover", e => {
                t.forEach( (i, s) => {
                    s <= t.indexOf(e.target) ? i.classList.add("is-overed") : i.classList.remove("is-overed")
                }
                )
            }
            ),
            e.addEventListener("mouseleave", e => {
                t.forEach(e => {
                    e.classList.remove("is-overed")
                }
                )
            }
            ),
            e.addEventListener("click", e => {
                let s = t.indexOf(e.target);
                i.value = s + 1,
                t.forEach( (i, s) => {
                    s <= t.indexOf(e.target) ? i.classList.add("is-selected") : i.classList.remove("is-selected")
                }
                )
            }
            )
        }
        )
    }
    ;
    class t {
        constructor() {
            this.initAccessories(),
            this.initMultiSelect(),
            this.initBsTooltips(),
            this.initRangeSlider(),
            new UomoElements.JsHoverContent,
            new UomoElements.Search,
            new UomoElements.Aside,
            new UomoElements.QtyControl,
            new UomoElements.ScrollToTop,
            new UomoElements.Countdown,
            new UomoElements.ShopViewChange,
            new UomoElements.Filters,
            new UomoElements.StickyElement,
            new UomoElements.StarRating,
            new UomoSections.Header,
            new UomoSections.Footer,
            new UomoSections.CustomerSideForm,
            new UomoSections.CartDrawer,
            new UomoSections.SwiperSlideshow,
            new UomoSections.ProductSingleMedia
        }
        initAccessories() {
            window.addEventListener("resize", function() {
                UomoHelpers.isMobile = UomoHelpers.updateDeviceSize()
            })
        }
        initMultiSelect() {
            let e = document.querySelectorAll(".multi-select");
            this._initMultiSelect(e)
        }
        _initMultiSelect(e) {
            e.forEach(e => {
                let t = e
                  , i = e.querySelector(".multi-select__list")
                  , s = t.querySelector("select")
                  , o = t.querySelector(".multi-select__actor")
                  , r = t.querySelectorAll(".js-multi-select");
                r.forEach(e => {
                    e.addEventListener("click", function(e) {
                        e.preventDefault();
                        let t = Array.prototype.indexOf.call(i.children, e.currentTarget).toString()
                          , r = s.options[t];
                        if (r && !r.selected ? (e.currentTarget.classList.add("mult-select__item_selected"),
                        r.selected = !0) : (e.currentTarget.classList.remove("mult-select__item_selected"),
                        r.selected = !1),
                        o && !o.classList.contains("js-no-update")) {
                            let l = o.dataset.placeholder;
                            if (s.selectedIndex > -1) {
                                l = "";
                                for (let n = 0; n < s.selectedOptions.length; n++) {
                                    let a = s.selectedOptions[n];
                                    l += a.innerText,
                                    n < s.selectedOptions.length - 1 && (l += ", ")
                                }
                            }
                            o.innerText = l
                        }
                    })
                }
                )
            }
            )
        }
        initBsTooltips() {
            let e = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            e.map(function(e) {
                return new bootstrap.Tooltip(e)
            })
        }
        initRangeSlider() {
            let e = {
                elementClass: ".price-range-slider",
                minElement: ".price-range__min",
                maxElement: ".price-range__max"
            };
            document.querySelectorAll(e.elementClass).forEach(t => {
                let i = t.dataset.currency;
                if (t) {
                    let s = new Slider(t,{
                        tooltip_split: !0,
                        formatter: function(e) {
                            return i + e
                        }
                    });
                    s.on("slideStop", s => {
                        let o = t.parentElement.querySelector(e.minElement)
                          , r = t.parentElement.querySelector(e.maxElement);
                        o.innerText = i + s[0],
                        r.innerText = i + s[1]
                    }
                    )
                }
            }
            )
        }
    }
    document.addEventListener("DOMContentLoaded", function() {
        UomoHelpers.isMobile = UomoHelpers.updateDeviceSize(),
        new t
    }),
    $('a[data-bs-toggle="tab"]').on("shown.bs.tab", function(e) {
        var t = $(e.target).attr("href")
          , i = $(".tab-pane" + t);
        i.find(".swiper-container").length > 0 && 0 === i.find(".swiper-slide-active").length && document.querySelectorAll(".tab-pane" + t + " .swiper-container").forEach(function(e) {
            e.swiper.update(),
            e.swiper.lazy.load()
        })
    }),
    $("#quickView.modal").on("shown.bs.modal", function(e) {
        var t = "#quickView"
          , i = $(".modal" + t);
        i.find(".swiper-container").length > 0 && 0 === i.find(".swiper-slide-active").length && document.querySelectorAll(".modal" + t + " .swiper-container").forEach(function(e) {
            e.swiper.update(),
            e.swiper.lazy.load()
        })
    }),
    [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function(e) {
        return new bootstrap.Popover(e,{
            html: !0
        })
    }),
    $(".shopping-cart .btn-checkout").on("click", function() {
        window.location.href = "./shop_checkout.html"
    }),
    $(".checkout-form .btn-checkout").on("click", function() {
        window.location.href = "./shop_order_complete.html"
    }),
    $(document).on("click", ".cart-table .remove-cart", function(e) {
        e.preventDefault();
        let t = $(this).closest("tr");
        $(t).addClass("_removed"),
        setTimeout( () => {
            $(t).remove()
        }
        , 350)
    }),
    document.querySelector(".js-show-register").addEventListener("click", function(e) {
        document.querySelector(this.getAttribute("href")).click()
    }),
    $(document).on("click", "button.js-add-wishlist, a.add-to-wishlist", function() {
        return $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active"),
        !1
    }),
    $('[data-fancybox="gallery"]').length > 0 && $('[data-fancybox="gallery"]').fancybox({
        backFocus: !1
    }),
    $(window).on("scroll", function() {
        $(".mobile_fixed-btn_wrapper").length > 0 && (992 > $(this).width() && $(this).width() >= 768 ? $(this).scrollTop() + $(this).height() - 76 <= $(".mobile_fixed-btn_wrapper").offset().top && $(this).scrollTop() > $(this).height() ? $(".mobile_fixed-btn_wrapper > .button-wrapper").addClass("fixed-btn") : $(".mobile_fixed-btn_wrapper > .button-wrapper").removeClass("fixed-btn") : 768 > $(this).width() && $(this).scrollTop() + $(this).height() - 124 <= $(".mobile_fixed-btn_wrapper").offset().top && $(this).scrollTop() > $(this).height() ? $(".mobile_fixed-btn_wrapper > .button-wrapper").addClass("fixed-btn") : $(".mobile_fixed-btn_wrapper > .button-wrapper").removeClass("fixed-btn"))
    }),
    window.onload = () => {
        $("#newsletterPopup").length > 0 && $("#newsletterPopup").modal("show"),
        $(".btn-video-player").each(function() {
            $(this).on("click", function() {
                $(this).hasClass("playing") ? ($(this).removeClass("playing"),
                $($(this).data("video")).get(0).pause()) : ($(this).addClass("playing"),
                $($(this).data("video")).get(0).play())
            });
            let e = $(this);
            $($(this).data("video")).on("ended", function() {
                $(e).removeClass("playing"),
                this.currentTime = 0
            })
        })
    }
}($),
function() {
    "use strict";
    var e = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(e).forEach(function(e) {
        e.addEventListener("submit", function(t) {
            e.checkValidity() || (t.preventDefault(),
            t.stopPropagation()),
            e.querySelectorAll("input[data-cf-pwd]").forEach(function(i) {
                e.querySelector(i.getAttribute("data-cf-pwd")).value != i.value && (t.preventDefault(),
                t.stopPropagation())
            }),
            e.classList.add("was-validated")
        }, !1),
        e.querySelectorAll("input[data-cf-pwd]").forEach(function(t) {
            t.addEventListener("keyup", function(i) {
                t.value && e.querySelector(t.getAttribute("data-cf-pwd")).value == t.value ? (t.classList.remove("is-invalid"),
                t.classList.add("is-valid"),
                t.setCustomValidity("")) : (t.classList.add("is-invalid"),
                t.classList.remove("is-valid"),
                t.setCustomValidity("Invalid field."))
            }),
            e.querySelector(t.getAttribute("data-cf-pwd")).addEventListener("keyup", function(i) {
                t.value && e.querySelector(t.getAttribute("data-cf-pwd")).value == t.value ? (t.classList.remove("is-invalid"),
                t.classList.add("is-valid"),
                t.setCustomValidity("")) : (t.classList.add("is-invalid"),
                t.classList.remove("is-valid"),
                t.setCustomValidity("Invalid field."))
            })
        })
    })
}(),
window.addEventListener("load", () => {
    try {
        let e = window.location.href.split("#").pop();
        document.querySelector("#" + e).click()
    } catch {}
}
);
