/*
 *  filename: src/home/App.js
 *  description: -
 **/

/** External imports **/
import React from 'react';

/** Project imports **/
import Navbar from 'Components/Navbar';
import Footer from 'Components/Footer';

import Masthead from './Masthead';
import Music from './Music';

/** Style imports **/
import './App.css';

import { MAILING_LIST_LINK, RELEASES} from "./CONSTANTS";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.displayLoading = this.displayLoading.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = { loaded: 0 };
    }

    componentDidMount() {
        let s = this;
        setTimeout(() => {
            Promise.all(
                Array.from(document.images).filter(img => !img.complete).map(
                    img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
                        s.setState({loaded: 1});
                        let b = document.getElementsByTagName("body")[0];
                        b.classList.add("scroll");
            });
        }, 1300);
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll(e) {
        let x = document.getElementsByClassName("mail")[0]
        let y = document.getElementsByClassName("mail-stamp")[0]
        let z = document.getElementsByClassName("mail-text")[0]
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 84) {
            x.classList.add("hover");
            y.classList.add("hover");
            z.classList.add("hover");
        }
        else {
            x.classList.remove("hover");
            y.classList.remove("hover");
            z.classList.remove("hover");
        }
    }

    displayLoading() {
        if (!this.state.loaded) {
            return(<div id="loading"><div id="emblem-clean"/></div>);
        }
        return(<div id="loading" className="fade-out"/>)
    }

    render() {
        const sections = [
            <Navbar />,
            <Masthead />,
            <Music />
        ];

        return (
            <React.Fragment>

                { this.displayLoading() }
                <div id="background" className="derp"/>

                { sections }

                <section id="tour" className="even">
                    <div className="tour-line odd-tour-line">
                        <div className="show-date">
                            <a className="show" href="https://www.songkick.com/festivals/1632659-lost-lands/id/39935702-lost-lands-2021">
                            SEPTEMBER 24, 2021</a></div>
                        <div className="show-name">
                            <a className="show" href="https://www.songkick.com/festivals/1632659-lost-lands/id/39935702-lost-lands-2021">
                            LOST LANDS</a></div>
                        <div className="location-info">
                            <div> LEGEND VALLEY></div>
                            <div> THORNVILLE OH, USA</div>
                        </div>
                        <button onClick={() => {window.open('https://www.lostlandsfestival.com')}} type="button" className="btn btn-secondary btn-sm ticket-button">TICKETS</button>
                    </div>
                    <a className="show" href="https://www.songkick.com/concerts/39467882-shiverz-at-cervantes-masterpiece-ballroom">
                    <div className="tour-line even-tour-line strikethrough">
                        <div className="show-date">APRIL 03, 2020</div>
                        <div className="show-name">BASS INFERNO</div>
                        <div className="location-info">
                            <div>CERVANTES' MASTERPIECE BALLROOM</div>
                            <div>DENVER CO, USA</div>
                        </div>
                        <button type="button" className="btn btn-secondary btn-sm" disabled>TICKETS</button>
                    </div>
                    </a>
                    <a className="show" href="https://www.songkick.com/concerts/39504516-funtcase-at-hangar-305">
                    <div className="tour-line odd-tour-line strikethrough">
                        <div className="show-date">MARCH 19, 2020</div>
                        <div className="show-name">DPMO MMW SHOWCASE</div>
                        <div className="location-info">
                            <div>HANGAR 305</div>
                            <div>MIAMI FL, USA</div>
                        </div>
                        <button type="button" className="btn btn-secondary btn-sm" disabled>TICKETS</button>
                    </div>
                    </a>
                    <a className="show" href="https://www.songkick.com/concerts/39470745-akeos-at-fairmount-theatre">
                    <div className="tour-line even-tour-line strikethrough">
                        <div className="show-date">MARCH 06, 2020</div>
                        <div className="show-name">AKEOS PRESENTS</div>
                        <div className="location-info">
                            <div>FAIRMOUNT THEATRE</div>
                            <div>MONTREAL QC, CANADA</div>
                        </div>
                        <button type="button" className="btn btn-secondary btn-sm" disabled>TICKETS</button>
                    </div>
                    </a>
                </section>

                <section id="mailing" className="odd" onClick={ () => { window.open(MAILING_LIST_LINK)}}>
                    <div className="mail-text">JOIN THE AKEOS MAILING LIST</div>
                    <div className="mail">
                        <div className="mail-stamp"/>
                    </div>
                </section>
                <Footer />
            </React.Fragment>
        )
    }
}

export default App;
