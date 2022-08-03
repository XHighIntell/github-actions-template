



declare namespace jitest {


    export class TestCase {

        status: 'passed' | 'failed' | 'running';
        icon: 'class' | 'event' | 'method' | 'namespace' | 'property';
        title: string;
        run: () => Promise<void>;
        children: TestCase[];
        element: HTMLElement;

        // methods
        getPrivate(): TestCasePrivate;
        add(option: TestCaseOption): TestCase;
        start(includeDescendants: boolean): void;

        constructor(element: HTMLElement);
        constructor(options: TestCaseOption);
    }
    interface TestCasePrivate {

        status: string;
        icon: string;
        title: string;
        run: () => Promise<void>;
        children: TestCase[];

        element: HTMLElement;
        elementStatus: HTMLElement;
        elementIcon: HTMLElement;
        elementTitle: HTMLElement;
        elementActionRun: HTMLElement;
        elementActionRunDescendants: HTMLElement;
        elementChildren: HTMLElement;
    }

    interface TestCaseOption {
        icon: string;
        title: string;
        run: Promise<any>
        children: TestCaseOption[];
    }

}