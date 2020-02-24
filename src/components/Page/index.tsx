import * as React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Tabs } from 'antd';
import { gameActiveSelector } from 'store/selectors/game';
import { ErrorBoundary } from 'components/ErrorBoundary';
import { GameTab } from 'components/Page/components/GameTab';
import { SettingsTab } from 'components/Page/components/SettingsTab';
import './styles.css';

const { TabPane } = Tabs;

type PageProps = {
    isGameActive: boolean;
};

const mapStateToProps = createSelector(gameActiveSelector, (isGameActive) => ({
    isGameActive,
}));

export const Page = connect(mapStateToProps)(
    ({ isGameActive: disabled }: PageProps) => (
        <main className="Page">
            <ErrorBoundary>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Игра" key="1">
                        <GameTab />
                    </TabPane>
                    <TabPane tab="Настройки" key="2" disabled={disabled}>
                        <SettingsTab />
                    </TabPane>
                </Tabs>
            </ErrorBoundary>
        </main>
    ),
);
