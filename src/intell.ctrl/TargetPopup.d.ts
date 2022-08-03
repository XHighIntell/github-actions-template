


declare namespace intell.ctrl {
    export class TargetPopup {

        constructor(element: HTMLElement);

        // properties
        element: HTMLElement;


        // methods
        getPrivate(): TargetPopupPrivate;

        /** When sets target element while shown, control will immediately show popup at this new target element. */
        showAt(target: HTMLElement): void;
        showAt(coordinates: JQuery.Coordinates): void;


    }

    interface TargetPopupPrivate {

    }

}