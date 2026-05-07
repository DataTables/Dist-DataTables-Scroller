import DataTables, { Api, Context, Config as Config$1, Dom } from 'datatables.net';
export { default } from 'datatables.net';

/**
 * Scroller is a virtual rendering plug-in for DataTables which allows large
 * datasets to be drawn on screen very quickly. What the virtual rendering means
 * is that only the visible portion of the table (and a bit to either side to
 * make the scrolling smooth) is drawn, while the scrolling container gives the
 * visual impression that the whole table is visible. This is done by making use
 * of the pagination abilities of DataTables and moving the table around in the
 * scrolling container DataTables adds to the page. The scrolling container is
 * forced to the height it would be for the full table display using an extra
 * element.
 *
 * Note that rows in the table MUST all be the same height. Information in a
 * cell which expands on to multiple lines will cause some odd behaviour in the
 * scrolling.
 *
 * Key features include:
 *
 * * Speed! The aim of Scroller for DataTables is to make rendering large data
 *   sets fast
 * * Full compatibility with deferred rendering in DataTables for maximum speed
 * * Display millions of rows
 * * Integration with state saving in DataTables (scrolling position is saved)
 * * Easy to use
 */
declare class Scroller {
    static defaults: Defaults;
    /**
     * Scroller version
     */
    static version: string;
    /**
     * Calculate and store information about how many rows are to be displayed
     * in the scrolling viewport, based on current dimensions in the browser's
     * rendering. This can be particularly useful if the table is initially
     * drawn in a hidden element - for example in a tab.
     *
     * @param redraw Redraw the table automatically after the recalculation,
     *   with the new dimensions forming the basis for the draw.
     */
    measure(redraw?: boolean): void;
    /**
     * Get information about current displayed record range. This corresponds to
     * the information usually displayed in the "Info" block of the table.
     *
     * @returns Display information object
     */
    pageInfo(): {
        start: number;
        end: number;
    };
    /**
     * Calculate the row number that will be found at the given pixel position
     * (y-scroll).
     *
     * Please note that when the height of the full table exceeds 1 million
     * pixels, Scroller switches into a non-linear mode for the scrollbar to fit
     * all of the records into a finite area, but this function returns a linear
     * value (relative to the last non-linear positioning).
     *
     * @param pixels Offset from top to calculate the row number of
     * @param intParse If an integer value should be returned
     * @param virtual Perform the calculations in the virtual domain
     * @returns Row index
     */
    private pixelsToRow;
    /**
     * Calculate the pixel position from the top of the scrolling container for
     * a given row
     *
     * @param rowIdx Row number to calculate the position of
     * @param intOnly Return just an integer (default = true)
     * @param virtual Make a virtual calculation
     * @returns Pixels
     */
    private rowToPixels;
    /**
     * Calculate the row number that will be found at the given pixel position
     * (y-scroll)
     *
     * @param row Row index to scroll to
     * @param animate Animate the transition or not
     */
    private scrollToRow;
    private c;
    private dom;
    private s;
    constructor(dt: Api | Context, opts: Config$1);
    /**
     * Initialisation for Scroller
     */
    private _init;
    /**
     * Automatic calculation of table row height. This is just a little tricky
     * here as using initialisation DataTables has tale the table out of the
     * document, so we need to create a new table and insert it into the
     * document, calculate the row height and then whip the table out.
     */
    private _calcRowHeight;
    /**
     * Draw callback function which is fired when the DataTable is redrawn. The
     * main function of this method is to position the drawn table correctly the
     * scrolling container for the rows that is displays as a result of the
     * scrolling position.
     */
    private _draw;
    /**
     * Convert from one domain to another. The physical domain is the actual
     * pixel count on the screen, while the virtual is if we had browsers which
     * had scrolling containers of infinite height (i.e. the absolute value)
     *
     * @param dir Domain transform direction, `virtualToPhysical` or
     *   `physicalToVirtual`
     * @returns Calculated transform
     */
    private _domain;
    /**
     * Update any information elements that are controlled by the DataTable
     * based on the scrolling viewport and what rows are visible in it. This
     * function basically acts in the same way as in DataTables, and effectively
     * replaces that function.
     */
    private _info;
    /**
     * String replacement for info display. Basically the same as what
     * DataTables does.
     *
     * @param str
     * @param start
     * @param end
     * @param max
     * @param total
     * @returns Formatted string
     */
    private _macros;
    /**
     * Parse CSS height property string as number
     *
     * An attempt is made to parse the string as a number. Currently supported
     * units are 'px', 'vh', and 'rem'. 'em' is partially supported; it works as
     * long as the parent element's font size matches the body element. Zero is
     * returned for unrecognized strings.
     *
     * @param cssHeight CSS height property string
     * @returns Height
     */
    private _parseHeight;
    /**
     * Scrolling function - fired whenever the scrolling position is changed.
     * This method needs to use the stored values to see if the table should be
     * redrawn as we are moving towards the end of the information that is
     * currently drawn or not. If needed, then it will redraw the table based on
     * the new position.
     */
    private _scroll;
    /**
     * Force the scrolling container to have height beyond that of just the
     * table that has been drawn so the user can scroll the whole data set.
     *
     * Note that if the calculated required scrolling height exceeds a maximum
     * value (1 million pixels - hard-coded) the forcing element will be set
     * only to that maximum value and virtual / physical domain transforms will
     * be used to allow Scroller to display tables of any number of records.
     */
    private _scrollForce;
}

declare module 'datatables.net' {
    interface Config {
        /**
         * Scroller extension options
         */
        scroller?: boolean | Config;
    }
    interface Api<T> {
        /**
         * Scroller methods container
         *
         * @returns Api for chaining with the additional Scroller methods
         */
        scroller: ApiScrollerMethods<T>;
    }
    interface Context {
        scroller: Scroller;
    }
    interface ApiRowMethods<T> {
        /**
         * Scroll to a row
         */
        scrollTo(animate?: boolean): Api<T>;
    }
    interface DataTablesStatic {
        /**
         * Scroller class
         */
        Scroller: typeof Scroller;
    }
    interface StateLoad {
        scroller?: {
            topRow: number;
            baseRowTop: number;
            scrollTop: number;
        };
    }
}
interface Defaults {
    /**
     * Scroller uses the boundary scaling factor to decide when to redraw the
     * table - which it typically does before you reach the end of the currently
     * loaded data set (in order to allow the data to look continuous to a user
     * scrolling through the data).
     */
    boundaryScale: number;
    /**
     * The display buffer is what Scroller uses to calculate how many rows it
     * should pre-fetch for scrolling.
     */
    displayBuffer: number;
    /**
     * Scroller will attempt to automatically calculate the height of rows for
     * it's internal calculations. However the height that is used can be
     * overridden using this parameter.
     */
    rowHeight: number | string;
    /**
     * When using server-side processing, Scroller will wait a small amount of
     * time to allow the scrolling to finish before requesting more data from
     * the server.
     */
    serverWait: number;
}
interface Config extends Partial<Defaults> {
}
interface ApiScrollerMethods<T> {
    /**
     * Calculate and store information about how many rows are to be displayed
     * in the scrolling viewport, based on current dimensions in the browser's
     * rendering.
     *
     * @param redraw Flag to indicate if the table should immediately redraw or
     *   not. true will redraw the table, false will not.
     * @returns DataTables Api instance for chaining
     */
    measure(redraw?: boolean): Api<T>;
    /**
     * Get information about current displayed record range.
     *
     * @returnsAn object with the parameters start and end, defining the start
     *   and end, 0 based, display indexes of the rows that are visible in the
     *   table's scrolling viewport.
     */
    page(): PageInfo;
    /**
     * Move the display to show the row at the index given.
     *
     * @param index Display index to jump to.
     * @param animate Animate the scroll (true) or not (false).
     */
    toPosition(index: number, animate?: boolean): Api<T>;
}
interface PageInfo {
    /**
     * The 0-indexed record at the top of the viewport
     */
    start: number;
    /**
     * The 0-indexed record at the bottom of the viewport
     */
    end: number;
}
interface Settings {
    /**
     * Indicate if the scroll should animate or not
     */
    ani: boolean;
    /**
     * DataTables settings object
     */
    dt: Context;
    /**
     * DataTables API instance
     */
    dtApi: Api;
    /**
     * Pixel location of the top of the drawn table in the viewport
     */
    tableTop: number;
    /**
     * Pixel location of the bottom of the drawn table in the viewport
     */
    tableBottom: number;
    /**
     * Pixel location of the boundary for when the next data set should be
     * loaded and drawn when scrolling up the way.
     */
    redrawTop: number;
    /**
     * Pixel location of the boundary for when the next data set should be
     * loaded and drawn when scrolling down the way. Note that this is actually
     * calculated as the offset from the top.
     */
    redrawBottom: number;
    /**
     * Auto row height or not indicator
     */
    autoHeight: boolean;
    /**
     * Number of rows calculated as visible in the visible viewport
     */
    viewportRows: number;
    /**
     * setTimeout reference for state saving, used when state saving is enabled
     * in the DataTable and when the user scrolls the viewport in order to stop
     * the cookie set taking too much CPU!
     */
    stateTO: null | ReturnType<typeof setTimeout>;
    stateSaveThrottle: Function;
    /**
     * setTimeout reference for the redraw, used when server-side processing is
     * enabled in the DataTables in order to prevent DoSing the server
     */
    drawTO: null | ReturnType<typeof setTimeout>;
    heights: {
        jump: number;
        page: number;
        virtual: number;
        scroll: number;
        row: number;
        viewport: number;
        labelHeight: number;
        xbar: number;
    };
    topRowFloat: number;
    scrollDrawDiff: null;
    labelVisible: boolean;
    forceReposition: boolean;
    baseRowTop: number;
    baseScrollTop: number;
    mousedown: boolean;
    lastScrollTop: number;
    ignoreScroll: boolean;
    scrollType: 'jump' | 'cont';
    skip: boolean;
    targetTop: number;
}
interface DomInternal {
    force: Dom;
    label: Dom;
    scroller: Dom;
    table: Dom;
}

export type { Config, Defaults, DomInternal, Settings };
