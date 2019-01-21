import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import { DataProvider } from "../../providers/data/data.service";
import { Profile } from "../../models/profile/profile.interface";

@Component({
    selector: 'app-profile-search',
    templateUrl: 'profile-search.component.html'
})

export class ProfileSearchComponent implements OnInit{

  query: string;
  profileList: Profile[];
  allProfileList: Profile[];
  keyUserLogged: string;

  @Output() selectedProfile: EventEmitter<Profile>;

  constructor(private data: DataProvider) {
    const profile: Profile = JSON.parse(localStorage.getItem('selectedUser'));
    this.keyUserLogged = profile.mykey;
    this.selectedProfile = new EventEmitter<Profile>();
  }

  ngOnInit(): void {
    this.data.getAllUsers().subscribe((profiles: Profile[])=>{
      this.allProfileList = profiles;
    })
  }

  searchUser(query: string) {
      const trimmedQuery = query.trim();

      if(trimmedQuery === query) {
          this.data.searchUser(query).subscribe((profiles: Profile[]) => {
              this.profileList = profiles;
          })
      }
  }

  selectProfile(profile: Profile) {
      this.selectedProfile.emit(profile);
  }
}
