import React from 'react';
import CategoryBarData from './CategoryBar.json';
import NoneScroller from '../NoneScroller/NoneScroller';
import CatOrPackCard from '../CatOrPackCard/CatOrPackCard';

function CategoryBar() {
    return (
        <div>
            <NoneScroller
                title="Category"
                description="Choose your category and rent what you need from our site!"
                className="nonScrollerWrapperFourColumn"
            >
                {
                    CategoryBarData.map((item, index) => (
                        <div key={index}>
                            <CatOrPackCard
                                imageSrc={item.icon}
                                imageAlt={item.imgAlt}
                                title={item.title}
                                url={item.url}
                            />
                        </div>
                    ))
                }
            </NoneScroller>
        </div>
    );
}

export default CategoryBar;
