/**
 * Function that is called when calling contextmenu on an element (eg. $('.contextmenu').contextMenu())
 * @param {(string|Object)} operation
 */
export default function (operation) {
    const $t = this;
    const $o = operation;
    if ($t.length > 0) { // this is not a build on demand menu
        if (typeof operation === 'undefined') {
            $t.first().trigger('contextmenu');
        } else if (typeof operation.x !== 'undefined' && typeof operation.y !== 'undefined') {
            $t.first().trigger($.Event('contextmenu', {
                pageX: operation.x,
                pageY: operation.y,
                mouseButton: operation.button
            }));
        } else if (operation === 'hide') {
            const $menu = this.first().data('contextMenu') ? this.first().data('contextMenu').$menu : null;
            if ($menu) {
                $menu.trigger('contextmenu:hide');
            }
        } else if (operation === 'destroy') {
            $.contextMenu('destroy', {context: this});
        } else if ($.isPlainObject(operation)) {
            operation.context = this;
            $.contextMenu('create', operation);
        } else if (operation) {
            $t.removeClass('context-menu-disabled');
        } else if (!operation) {
            $t.addClass('context-menu-disabled');
        }
    } else {
        // eslint-disable-next-line no-undef
        $.each($.contextMenu.menus, function () {
            if (this.selector === $t.selector) {
                $o.data = this;

                $.extend($o.data, {trigger: 'demand'});
            }
        });

        $.contextMenu.handle.contextmenu.call($o.target, $o);
    }

    return this;
}