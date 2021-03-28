import { Component, OnInit, HostListener } from "@angular/core";
import {
  trigger,
  state,
  transition,
  style,
  animate
} from "@angular/animations";
import { Router } from "@angular/router";
import { CategoryService } from "../services/category.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SNACK_BAR_DURATION } from "../utils/constants.utils";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  animations: [
    trigger("fade", [
      state("void", style({ opacity: 0 })),
      transition(":enter", [animate(300)]),
      transition(":leave", [animate(500)])
    ])
  ]
})
export class HomeComponent implements OnInit {
  category: any = [];
  public sliders: Array<any> = [];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
    this.sliders.push(
      {
        imagePath: "./assets/images/banner1.webp",
        label: "First slide label",
        text: ""
      },
      {
        imagePath: "./assets/images/banner2.jpg",
        label: "Second slide label",
        text: ""
      },
      {
        imagePath: "./assets/images/banner3.webp",
        label: "Third slide label",
        text: ""
      }
    );
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  getCategoryList() {
    this.categoryService.getCategories().subscribe(
      data => {
        this.category = data.data.map((cat: any) => {
          return {
            id: cat._id,
            categoryName: cat.name,
            categoryImage: cat.url
          };
        });
      },
      (error: any) => {
        let errorMessage = error.message || "No categories";
        this.snackBar.open(errorMessage, "Close", {
          panelClass: "snack-error-message",
          duration: SNACK_BAR_DURATION
        });
      }
    );
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e: any) {
    if (window.pageYOffset > 150) {
      let element: any = document.getElementById("navbar");
      element.classList.add("sticky");
    } else {
      let element: any = document.getElementById("navbar");
      element.classList.remove("sticky");
    }
  }

  getProducts(data: any): void {
    this.router.navigate(["/products"], {
      queryParams: { category: data.id, categoryName: data.categoryName }
    });
  }
}
