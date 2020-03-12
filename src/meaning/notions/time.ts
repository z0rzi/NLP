import {WordGroup, Word} from 'grammar/tokenizer';
import * as Data from 'data/data';

import {Meaning} from './meaning';
import Thing from './thing/thing';

export default class Time extends Thing {

    _raw: string;

    // after, before, during
    _modifiers: [string];

    _addition?: Meaning;

    _weekDay: number;
    _day:     number;
    _month:   number;
    _year:    number;
    _hour:    number;
    _minute:  number;
    _second:  number;

    _isRepetition: boolean;

    protected processWords() {
        this.findDate();
    }

    private findDate() {
        const components = Data.getData('timeComponents');

        for (const component of Object.keys(components)) {
            const possibleMatches = components[component];

            for (const possibleMatch of Object.keys(possibleMatches)) {
                const result = possibleMatches[possibleMatch];
                let match = '';
                if (/\$\d/.test(result)) {
                    match = this._wordGroup.toString().replace(new RegExp('^.*'+possibleMatch+'.*$', 'gi'), result);
                    if (match === this._wordGroup.toString())
                        match = '';
                } else {
                    const tmp = this._wordGroup.toString().match(new RegExp(possibleMatch, 'gi'));
                    if (tmp !== null && tmp.length > 0)
                        match = result;
                }

                if (!!match) {
                    switch(component) {
                        case 'weekDay':
                            this._weekDay = Number(match);
                            break;
                        case 'day':
                            this._day = Number(match);
                            break;
                        case 'month':
                            this._month = Number(match);
                            break;
                        case 'year':
                            this._year = Number(match);
                            break;
                        case 'hour':
                            this._hour = Number(match);
                            break;
                        case 'minute':
                            this._minute = Number(match);
                            break;
                        case 'second':
                            this._second = Number(match);
                            break;
                    }
                    break;
                }
            }
        }
    }
}
