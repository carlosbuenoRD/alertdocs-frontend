import React from 'react';

const AppFooter = (props: any) => {

    return (
        <div className="layout-footer">
            <div className="footer-logo-container">
                <img id="footer-logo" src={`assets/layout/images/logo-${props.colorScheme === 'light' ? 'dark' : 'light'}.png`} alt="atlantis-layout" />
                <span className="app-name">ALERTDOC V2</span>
            </div>
            <span className="copyright uppercase">&#169; Ministerio de economia, planificacion y desarrollo - 2022</span>
        </div>

    )
}

export default AppFooter;