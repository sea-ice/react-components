function Paginator(s, opt) {
    this.$el = $(s)
    if (!this.$el.length) throw new Error('The element "' + s + '" was not existed!')
    this.select = this.$el.find('select').get(0)
    this.$prev = this.$el.find('.prev-page')
    this.$next = this.$el.find('.next-page')
    this.input = this.$el.find('input[type=text]').get(0)
    this.submit = this.$el.find('.confirm-btn').get(0)


    if (!opt) throw new Error('The option is required!')
    if (!opt.max) throw new Error('The total account of items must be given!')
    this.total = opt.max

    var DEFAULT_COUNT_PER_PAGE = 20
    this.itemsPerPage = opt.itemsPerPage || DEFAULT_COUNT_PER_PAGE
    this.pages = Math.ceil(this.total / this.itemsPerPage)

    var DEFAULT_BUTTON_COUNT = 5
    this.buttons = parseInt(opt.buttonCount) || DEFAULT_BUTTON_COUNT
    if (this.buttons < 1) throw new Error("The value of the option 'buttonCount' is illegal!")

    var DEFAULT_CURRENT_PAGE = 1
    this.currentPage = parseInt(opt.currentPage) || DEFAULT_CURRENT_PAGE
    if (this.currentPage < 1) throw new Error("The value of the option 'currentPage' is illegal!")

    this.pageChangeHook = opt.pageChange
    if (typeof this.pageChangeHook !== 'function') throw new Error('"pageChange" option must be function!')
}

Paginator.prototype.init = function () {
    var self = this

    this.select.addEventListener('change', function (e) {
        // 下拉菜单的值发生变化自动失焦，以切换下拉框右侧的箭头
        self.select.blur()
        self.itemsPerPage = parseInt(e.target.value)
        self.updatePaginator()
    })

    this.input.addEventListener('keydown', function (e) {
        // 删除键：8
        // 回车：13
        var value = e.target.value
        if (e.keyCode === 8) return

        if (e.keyCode === 13) {
            if (!value || parseInt(value) === 0) return
            self.currentPage = Math.min(parseInt(value), self.pages)
            self.updatePageRange(true)
        }

        // 非数字
        if (e.keyCode < 48 || e.keyCode > 57) {
            e.preventDefault()
        }
    })

    this.submit.addEventListener('click', function () {
        var value = self.input.value
        if (!value || parseInt(value) === 0) return
        self.currentPage = Math.min(parseInt(value), self.pages)
        self.updatePageRange(true)
    })

    this.$prev.on('click', function (e) {
        if (self.currentPage - 1 === 0) return
        self.currentPage -= 1
        self.updatePageRange(true)
    })

    this.$next.on('click', function (e) {
        if (self.currentPage === self.pages) return
        self.currentPage += 1
        console.log(self.currentPage)
        self.updatePageRange(true)
    })

    this.$el.find('.total-items').text(this.total)

    this.updatePaginator()
    this.show()
}

Paginator.prototype.updatePaginator = function () {
    var self = this
    this.pageButtons = this.$el.find('.page-button')
    if (this.pageButtons.length) this.pageButtons.remove()

    this.pages = Math.ceil(this.total / this.itemsPerPage)
    this.$el.find('.pages-num').text(this.pages)
    this.currentPage = Math.min(this.pages, this.currentPage)
    this.updatePageRange(true)

    var buttons = ''
    for (var i = this.pageRange[0], len = this.pageRange[1]; i <= len; i++) {
        buttons += '<a href="javascript:void(0);" class="page-button paginator-button' + (this.currentPage === i ? ' current-btn' : '') + '">' + i + '</a>'
    }
    this.pageButtons = $(buttons).insertBefore(this.$next).on('click', function () {
        var $this = $(this)
        if (!$this.hasClass('current-btn')) {
            self.pageButtons.removeClass('current-btn')
            $this.addClass('current-btn')
        }
        self.updatePrevAndNext($this.text())
    })
}

Paginator.prototype.updatePageRange = function (replace) {
    var self = this
    if (this.buttons > this.pages) {
        this.pageRange = [1, this.pages]
    } else if (this.currentPage >= Math.ceil(this.buttons / 2)
        && this.currentPage <= this.pages - Math.floor(this.buttons / 2)) {
        this.pageRange = [this.currentPage - Math.floor(this.buttons / 2 - 0.5), this.currentPage + Math.floor(this.buttons / 2)]
    } else if (this.currentPage < Math.ceil(this.buttons / 2)) {
        this.pageRange = [1, this.buttons]
    } else {
        this.pageRange = [this.pages - this.buttons + 1, this.pages]
    }
    if (replace) {
        this.pageButtons.removeClass('current-btn')
        ;[].forEach.call(this.pageButtons, function (ele, i) {
            var $ele = $(ele)
            $ele.text(self.pageRange[0] + i)
            if (self.currentPage === self.pageRange[0] + i) $ele.addClass('current-btn')
        })
    }
    this.updatePrevAndNext()
}

Paginator.prototype.updatePrevAndNext = function (page) {
    var self = this
    if (page) this.currentPage = parseInt(page)
    ;[{
        p: 1,
        t: this.$prev
    }, {
        p: this.pages,
        t: this.$next
    }].forEach(function (v) {
        if (v.p === self.currentPage) {
            v.t.addClass('disabled-btn')
        } else if (v.t.hasClass('disabled-btn')) {
            v.t.removeClass('disabled-btn')
        }
    })
    this.pageChangeHook(this.currentPage, this.itemsPerPage)
}

Paginator.prototype.show = function () {
    this.$el.get(0).style.display = 'flex'
}

Paginator.prototype.hide = function () {
    this.$el.get(0).style.display = 'none'
}