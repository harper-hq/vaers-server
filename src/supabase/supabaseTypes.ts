export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      demographic_analytics: {
        Row: {
          age_group: string | null
          id: string
          sex: string | null
          symptom_type_id: string | null
          total_count: number | null
          updated_at: string | null
          vaccine_type_id: string | null
        }
        Insert: {
          age_group?: string | null
          id?: string
          sex?: string | null
          symptom_type_id?: string | null
          total_count?: number | null
          updated_at?: string | null
          vaccine_type_id?: string | null
        }
        Update: {
          age_group?: string | null
          id?: string
          sex?: string | null
          symptom_type_id?: string | null
          total_count?: number | null
          updated_at?: string | null
          vaccine_type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "demographic_analytics_symptom_type_id_fkey"
            columns: ["symptom_type_id"]
            isOneToOne: false
            referencedRelation: "unique_symptom_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "demographic_analytics_vaccine_type_id_fkey"
            columns: ["vaccine_type_id"]
            isOneToOne: false
            referencedRelation: "unique_vaccine_types"
            referencedColumns: ["id"]
          },
        ]
      }
      raw_reports: {
        Row: {
          age_yrs: number | null
          allergies: string | null
          birth_defect: boolean | null
          cage_mo: number | null
          cage_yr: number | null
          csv_url: string | null
          cur_ill: string | null
          datedied: string | null
          died: boolean | null
          disable: boolean | null
          er_ed_visit: boolean | null
          er_visit: boolean | null
          form_vers: string | null
          history: string | null
          hospdays: number | null
          hospital: boolean | null
          id: string
          l_threat: boolean | null
          lab_data: string | null
          numdays: number | null
          ofc_visit: boolean | null
          onset_date: string | null
          other_meds: string | null
          prior_vax: string | null
          recovd: boolean | null
          recvdate: string | null
          rpt_date: string | null
          sex: string | null
          splttype: string | null
          state: string | null
          symptom_text: string | null
          todays_date: string | null
          v_adminby: string | null
          v_fundby: string | null
          vaers_id: number
          vax_date: string | null
          vax_dose_series: string | null
          vax_lot: string | null
          vax_manu: string | null
          vax_name: string | null
          vax_route: string | null
          vax_site: string | null
          vax_type: string | null
          x_stay: boolean | null
        }
        Insert: {
          age_yrs?: number | null
          allergies?: string | null
          birth_defect?: boolean | null
          cage_mo?: number | null
          cage_yr?: number | null
          csv_url?: string | null
          cur_ill?: string | null
          datedied?: string | null
          died?: boolean | null
          disable?: boolean | null
          er_ed_visit?: boolean | null
          er_visit?: boolean | null
          form_vers?: string | null
          history?: string | null
          hospdays?: number | null
          hospital?: boolean | null
          id?: string
          l_threat?: boolean | null
          lab_data?: string | null
          numdays?: number | null
          ofc_visit?: boolean | null
          onset_date?: string | null
          other_meds?: string | null
          prior_vax?: string | null
          recovd?: boolean | null
          recvdate?: string | null
          rpt_date?: string | null
          sex?: string | null
          splttype?: string | null
          state?: string | null
          symptom_text?: string | null
          todays_date?: string | null
          v_adminby?: string | null
          v_fundby?: string | null
          vaers_id: number
          vax_date?: string | null
          vax_dose_series?: string | null
          vax_lot?: string | null
          vax_manu?: string | null
          vax_name?: string | null
          vax_route?: string | null
          vax_site?: string | null
          vax_type?: string | null
          x_stay?: boolean | null
        }
        Update: {
          age_yrs?: number | null
          allergies?: string | null
          birth_defect?: boolean | null
          cage_mo?: number | null
          cage_yr?: number | null
          csv_url?: string | null
          cur_ill?: string | null
          datedied?: string | null
          died?: boolean | null
          disable?: boolean | null
          er_ed_visit?: boolean | null
          er_visit?: boolean | null
          form_vers?: string | null
          history?: string | null
          hospdays?: number | null
          hospital?: boolean | null
          id?: string
          l_threat?: boolean | null
          lab_data?: string | null
          numdays?: number | null
          ofc_visit?: boolean | null
          onset_date?: string | null
          other_meds?: string | null
          prior_vax?: string | null
          recovd?: boolean | null
          recvdate?: string | null
          rpt_date?: string | null
          sex?: string | null
          splttype?: string | null
          state?: string | null
          symptom_text?: string | null
          todays_date?: string | null
          v_adminby?: string | null
          v_fundby?: string | null
          vaers_id?: number
          vax_date?: string | null
          vax_dose_series?: string | null
          vax_lot?: string | null
          vax_manu?: string | null
          vax_name?: string | null
          vax_route?: string | null
          vax_site?: string | null
          vax_type?: string | null
          x_stay?: boolean | null
        }
        Relationships: []
      }
      raw_symptoms: {
        Row: {
          created_at: string
          csv_url: string | null
          id: string
          symptom: string
          symptom_version: number
          vaers_id: number
        }
        Insert: {
          created_at?: string
          csv_url?: string | null
          id?: string
          symptom: string
          symptom_version: number
          vaers_id: number
        }
        Update: {
          created_at?: string
          csv_url?: string | null
          id?: string
          symptom?: string
          symptom_version?: number
          vaers_id?: number
        }
        Relationships: []
      }
      raw_vaccine_data: {
        Row: {
          created_at: string | null
          csv_url: string | null
          id: string
          vaers_id: number
          vax_dose_series: string | null
          vax_lot: string | null
          vax_manu: string | null
          vax_name: string | null
          vax_route: string | null
          vax_site: string | null
          vax_type: string | null
        }
        Insert: {
          created_at?: string | null
          csv_url?: string | null
          id?: string
          vaers_id: number
          vax_dose_series?: string | null
          vax_lot?: string | null
          vax_manu?: string | null
          vax_name?: string | null
          vax_route?: string | null
          vax_site?: string | null
          vax_type?: string | null
        }
        Update: {
          created_at?: string | null
          csv_url?: string | null
          id?: string
          vaers_id?: number
          vax_dose_series?: string | null
          vax_lot?: string | null
          vax_manu?: string | null
          vax_name?: string | null
          vax_route?: string | null
          vax_site?: string | null
          vax_type?: string | null
        }
        Relationships: []
      }
      staging_temporal_analytics: {
        Row: {
          cnt: number | null
          report_month: number | null
          report_year: number | null
          symptom: string | null
          vax_type: string | null
        }
        Insert: {
          cnt?: number | null
          report_month?: number | null
          report_year?: number | null
          symptom?: string | null
          vax_type?: string | null
        }
        Update: {
          cnt?: number | null
          report_month?: number | null
          report_year?: number | null
          symptom?: string | null
          vax_type?: string | null
        }
        Relationships: []
      }
      temporal_analytics: {
        Row: {
          id: string
          report_month: number | null
          report_year: number | null
          symptom_type_id: string | null
          total_count: number | null
          updated_at: string | null
          vaccine_type_id: string | null
        }
        Insert: {
          id?: string
          report_month?: number | null
          report_year?: number | null
          symptom_type_id?: string | null
          total_count?: number | null
          updated_at?: string | null
          vaccine_type_id?: string | null
        }
        Update: {
          id?: string
          report_month?: number | null
          report_year?: number | null
          symptom_type_id?: string | null
          total_count?: number | null
          updated_at?: string | null
          vaccine_type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "temporal_analytics_symptom_type_id_fkey"
            columns: ["symptom_type_id"]
            isOneToOne: false
            referencedRelation: "unique_symptom_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "temporal_analytics_vaccine_type_id_fkey"
            columns: ["vaccine_type_id"]
            isOneToOne: false
            referencedRelation: "unique_vaccine_types"
            referencedColumns: ["id"]
          },
        ]
      }
      total_vaccine_admins: {
        Row: {
          admin_count: number
          created_at: string | null
          id: string
          is_estimate: boolean | null
          report_year: number
          source_url: string | null
          updated_at: string | null
          vaccine_type_stats_id: string | null
        }
        Insert: {
          admin_count: number
          created_at?: string | null
          id?: string
          is_estimate?: boolean | null
          report_year: number
          source_url?: string | null
          updated_at?: string | null
          vaccine_type_stats_id?: string | null
        }
        Update: {
          admin_count?: number
          created_at?: string | null
          id?: string
          is_estimate?: boolean | null
          report_year?: number
          source_url?: string | null
          updated_at?: string | null
          vaccine_type_stats_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "total_vaccine_admins_vaccine_type_stats_id_fkey"
            columns: ["vaccine_type_stats_id"]
            isOneToOne: false
            referencedRelation: "unique_vaccine_types"
            referencedColumns: ["id"]
          },
        ]
      }
      unique_symptom_types: {
        Row: {
          count: number | null
          created_at: string
          id: string
          slug: string | null
          symptom: string
          updated_at: string | null
        }
        Insert: {
          count?: number | null
          created_at?: string
          id?: string
          slug?: string | null
          symptom: string
          updated_at?: string | null
        }
        Update: {
          count?: number | null
          created_at?: string
          id?: string
          slug?: string | null
          symptom?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      unique_vaccine_types: {
        Row: {
          arthralgia_count: number | null
          chills_count: number | null
          covid_19_count: number | null
          created_at: string
          dizziness_count: number | null
          dyspnoea_count: number | null
          erythema_count: number | null
          fatigue_count: number | null
          headache_count: number | null
          id: string
          injection_site_erythema_count: number | null
          injection_site_pain_count: number | null
          injection_site_swelling_count: number | null
          myalgia_count: number | null
          nausea_count: number | null
          no_adverse_event_count: number | null
          pain_count: number | null
          pain_in_extremity_count: number | null
          pruritus_count: number | null
          pyrexia_count: number | null
          rash_count: number | null
          total_count: number | null
          type: string | null
          updated_at: string
          vomiting_count: number | null
        }
        Insert: {
          arthralgia_count?: number | null
          chills_count?: number | null
          covid_19_count?: number | null
          created_at?: string
          dizziness_count?: number | null
          dyspnoea_count?: number | null
          erythema_count?: number | null
          fatigue_count?: number | null
          headache_count?: number | null
          id?: string
          injection_site_erythema_count?: number | null
          injection_site_pain_count?: number | null
          injection_site_swelling_count?: number | null
          myalgia_count?: number | null
          nausea_count?: number | null
          no_adverse_event_count?: number | null
          pain_count?: number | null
          pain_in_extremity_count?: number | null
          pruritus_count?: number | null
          pyrexia_count?: number | null
          rash_count?: number | null
          total_count?: number | null
          type?: string | null
          updated_at?: string
          vomiting_count?: number | null
        }
        Update: {
          arthralgia_count?: number | null
          chills_count?: number | null
          covid_19_count?: number | null
          created_at?: string
          dizziness_count?: number | null
          dyspnoea_count?: number | null
          erythema_count?: number | null
          fatigue_count?: number | null
          headache_count?: number | null
          id?: string
          injection_site_erythema_count?: number | null
          injection_site_pain_count?: number | null
          injection_site_swelling_count?: number | null
          myalgia_count?: number | null
          nausea_count?: number | null
          no_adverse_event_count?: number | null
          pain_count?: number | null
          pain_in_extremity_count?: number | null
          pruritus_count?: number | null
          pyrexia_count?: number | null
          rash_count?: number | null
          total_count?: number | null
          type?: string | null
          updated_at?: string
          vomiting_count?: number | null
        }
        Relationships: []
      }
      vaccine_symptom_type_stats: {
        Row: {
          count: number | null
          created_at: string
          id: string
          percent_of_total_reports: number | null
          symptom: string | null
          symptom_type_id: string | null
          updated_at: string
          vaccine: string | null
          vaccine_type_id: string | null
        }
        Insert: {
          count?: number | null
          created_at?: string
          id?: string
          percent_of_total_reports?: number | null
          symptom?: string | null
          symptom_type_id?: string | null
          updated_at?: string
          vaccine?: string | null
          vaccine_type_id?: string | null
        }
        Update: {
          count?: number | null
          created_at?: string
          id?: string
          percent_of_total_reports?: number | null
          symptom?: string | null
          symptom_type_id?: string | null
          updated_at?: string
          vaccine?: string | null
          vaccine_type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vaccine_symptom_type_stats_symptom_type_id_fkey"
            columns: ["symptom_type_id"]
            isOneToOne: false
            referencedRelation: "unique_symptom_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vaccine_symptom_type_stats_vaccine_type_id_fkey"
            columns: ["vaccine_type_id"]
            isOneToOne: false
            referencedRelation: "unique_vaccine_types"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_vaccine_symptom_stats: {
        Args: {
          target_symptom: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
