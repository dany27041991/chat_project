import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataProvider } from "../../providers/data/data.service";
import { AuthProvider } from "../../providers/auth/auth.service";
import { Profile } from "../../models/profile/profile.interface";
import { LoadingController, Loading } from "ionic-angular";
import { User } from "firebase";

@Component({
    selector: 'app-profile-view',
    templateUrl: 'profile-view.component.html'
})

export class ProfileViewComponent implements OnInit {

    private authUser: User;
    public userProfile: Profile;
    private loader: Loading;

    @Output() existingProfile: EventEmitter<Profile>;

    constructor(private data: DataProvider, private auth: AuthProvider, private loading: LoadingController) {
        this.existingProfile = new EventEmitter<Profile>();

        this.loader = this.loading.create({
            content: 'Loading profile ...'
        })
    }

    ngOnInit(): void {
        this.loader.present();

        /*this.data.getAuthenticatedUserProfile().subscribe(profile => {
            this.userProfile = <Profile>profile;
            this.existingProfile.emit(this.userProfile);
            this.loader.dismiss();
            })*/
        
        this.auth.getAuthenticatedUser().subscribe(auth => {
            this.authUser = auth;

            if(this.authUser !== null) {
                this.data.getProfile(this.authUser).subscribe((profile: Profile) =>
                {
                    this.userProfile = profile;
                    this.existingProfile.emit(this.userProfile);
                    this.loader.dismiss();
                })
            }
        })
    }
    
}