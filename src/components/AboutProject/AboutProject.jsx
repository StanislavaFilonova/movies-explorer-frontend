import React from 'react';
import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project section">
            <h2 className="section__title">О проекте</h2>
            <div className="about-project__container">
                <div className="about-project__container-fulltext">
                    <div className='about-project__container-textpart'>
                        <h3 className='about-project__container-title'>Дипломный проект включал 5 этапов</h3>
                        <p className='about-project__container-info'>Составление плана, работу над бэкендом, вёрстку,
                            добавление функциональности
                            и финальные доработки.</p>
                    </div>
                    <div className='about-project__container-textpart'>
                        <h3 className='about-project__container-title'>На выполнение диплома ушло 5 недель</h3>
                        <p className='about-project__container-info'>У каждого этапа был мягкий и жёсткий дедлайн,
                            которые нужно было соблюдать,
                            чтобы успешно защититься.</p>
                    </div>
                </div>
                <div className='about-project__time-line'>
                    <div className='about-project__time-line-big about-project__time-line-small'>
                        <span className='about-project__time-line-blue'>1 неделя</span>
                        <span className='about-project__caption'>Back-end</span>
                    </div>
                    <div className='about-project__time-line-big'>
                        <span className='about-project__time-line-blue about-project__time-line-grey'>4 недели</span>
                        <span className='about-project__caption'>Front-end</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;
