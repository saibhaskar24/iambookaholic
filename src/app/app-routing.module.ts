import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'mybooks', loadChildren: './mybooks/mybooks.module#MybooksPageModule' },
  { path: 'account', loadChildren: './account/account.module#AccountPageModule' },
  { path: 'explore', loadChildren: './explore/explore.module#ExplorePageModule' },
  { path: 'post', loadChildren: './post/post.module#PostPageModule' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
